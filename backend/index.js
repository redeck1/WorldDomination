import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import countries, {
    prepareCountries,
    next,
    attack,
    COUNTRIES,
} from "./countries.js";
import { existsSync } from "fs";
import config from "./game-config.json" with { type: "json" };
import { fileURLToPath } from "url";
import { dirname } from "path";
import { start } from "repl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateRandomString(length) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const parseChanges = (countryName, changes) => {
    for (let change of changes) {
        switch (change.type) {
            case "sanction":
                gameLogs.push(`[${countryName}] Санкции на ${change.to}`)
                break;

            case "atack":
                gameLogs.push(`[${countryName}] Атаковала ${change.name}`)
                break;

            case "expense":
                gameLogs.push(`[${countryName}] ${change.name}`)
                break

            default:
                break;
        }
    }
}

const broadcastGameUpdate = () => {
    for (const key in clients) {
        const client = clients[key];
        client.write("event: gameUpdate\n");
        client.write(
            `data: ${JSON.stringify({
                countries: prepareCountries(countries),
                ownCountry: { ...countries[key], ...generalInfo },
                logs: generalInfo.round > 6 ? gameLogs : ["Здесь пока ничего нет"]
            })}\n\n`
        );
    }
};

function startGameConsole() {
  const replServer = start({
    prompt: 'Game Console > ',
    useGlobal: true,
  });

  // Делаем нужные переменные доступными в REPL
  replServer.context.app = app;
  replServer.context.state = countries;
  replServer.context.__dirname = __dirname; // Если нужно

  console.log('REPL доступен. Используйте "state", "app" для управления.');
}

const PASSWORDS = Object.keys(config.PASSWORDS).reduce((prev, curr) =>
    ({ ...prev, [curr]: generateRandomString(16) }), {})
console.log("Пароли: ", PASSWORDS)
const numPlayers = config.numPlayers
const sancValue = 40;

const gameLogs = []

let generalInfo = {
    completed: 0,
    round: 1,
    ecologyLvl: [{ round: 1, lvl: 90 }],
};

let newGeneralInfo = {
    completed: 0,
    round: generalInfo.round + 1,
    ecologyLvl: [
        ...generalInfo.ecologyLvl,
        {
            round: generalInfo.round + 1,
            lvl: generalInfo.ecologyLvl.at(-1).lvl,
        },
    ],
};
const newCountries = structuredClone(countries);
let attacks = [];

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost", "http://localhost:80"], // Или '*' для любого домена
    methods: ["GET", "POST", "DELETE", "UPDATE"],
    credentials: true,
};

const PORT = process.env.PORT || 4444;

const clients = {};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(__dirname + "/imgs"));

app.use("/", (req, res, next) => {
    res.on("finish", () => {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        const url = decodeURIComponent(req.url);
        const data = `${hour}:${minutes}:${seconds}:${milliseconds} ${req.method
            } ${url} -> ${res.statusCode} ${res.statusMessage || ""}`;
        console.log(data);
    });

    next();
});

//SSE endpoint (GET)
app.get("/game-update", (req, res) => {
    const password = req.cookies.session;
    const countryName = req.query.country_name;
    const realCountryName = Object.keys(PASSWORDS).find(
        (k) => PASSWORDS[k] === password
    );
    if (
        !Object.values(PASSWORDS).includes(password) ||
        countryName !== realCountryName
    )
        return res.status(403).json("Доступ запрещен");

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    clients[countryName] = res;
    req.on("close", () => {
        delete clients[countryName];
    });
});


app.get("/countries", (req, res) => {
    return res.status(200).json(prepareCountries(countries));
});

app.post("/login", (req, res) => {
    const password = req.body.password || req.cookies.session;

    if (!Object.values(PASSWORDS).includes(password))
        return res.status(403).json("Неверный код");

    const countryName = Object.keys(PASSWORDS).find(
        (k) => PASSWORDS[k] === password
    );

    res.cookie("session", password, {
        httpOnly: true,
        // secure: true, // Только HTTPS!
        sameSite: "Strict",
    });

    return res.status(200).json({
        isAuth: true,
        ...countries[countryName],
        ...generalInfo,
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("session", {
        httpOnly: true,
        // secure: true, // Только HTTPS!
        sameSite: "Strict",
    });
    return res.status(200).json("logout");

});

function rollbackCountry(name, oldCountry) {
    countries[name] = oldCountry;
    newCountries[name] = oldCountry;
    generalInfo.completed -= 1;
}

app.post("/next", (req, res) => {
    const { name, changes } = req.body;
    const password = req.cookies.session;

    const realCountryName = Object.keys(PASSWORDS).find(
        (k) => PASSWORDS[k] === password
    );
    if (
        !Object.values(PASSWORDS).includes(password) ||
        name !== realCountryName
    )
        return res.status(403).json("Доступ запрещен");

    if (countries[name].isComplete) {
        return res.status(400).json("Эта страна уже завершила ход");
    }
    const oldCountry = structuredClone(countries[name]);
    countries[name].isComplete = true;
    generalInfo.completed += 1;

    for (let change of changes) {
        switch (change.type) {
            case "eco": //Применяет экологию даже при отрицательном балансе
                let lvl = newGeneralInfo.ecologyLvl.at(-1).lvl;
                if (lvl + change.cost > 1) {
                    lvl += change.cost;
                } else {
                    lvl = 1;
                }
                newGeneralInfo.ecologyLvl.at(-1).lvl = lvl;
                break;

            case "sanction":
                newCountries[change.to].sanctionsFrom.push(name);
                const newBalance = newCountries[change.to].balance - sancValue
                newCountries[change.to].balance = Math.max(0, newBalance)
                break;

            case "atack":
                if (newCountries[name].bombs <= 0) {
                    rollbackCountry(name, oldCountry)
                    return res.status(400).json("Не хватает бомб для атаки")
                }
                newCountries[name].bombs -= 1;
                attacks.push(change.name);
                break;

            case "expense":
                if (newCountries[name].balance - change.cost < 0) {
                    rollbackCountry(name, oldCountry)
                    return res.status(400).json("Баланс страны меньше нуля");
                } else {
                    newCountries[name].balance -= change.cost;
                }

                if (change.name === "Развитие ядерной технологии") {
                    newCountries[name].isHaveNuclearTech = true;
                } else if (
                    change.name.includes("Улучшение") ||
                    change.name.includes("Щит")
                ) {
                    const cityName = change.name.split(" ").at(-1);
                    const index = newCountries[name].cities.findIndex(
                        (city) => city.name === cityName
                    );

                    change.name.includes("Улучшение")
                        ? (newCountries[name].cities[index].growth += 10)
                        : (newCountries[name].cities[
                            index
                        ].isHaveShield = true);
                } else if (change.name === "Строительство бомб") {
                    if (countries[name].isHaveNuclearTech === true) {
                        newCountries[name].bombs += change.count;
                    } else {
                        rollbackCountry(name, oldCountry)
                        return res
                            .status(400)
                            .send("Ядерная технология не развита");
                    }
                }
                break;

            default:
                rollbackCountry(name, oldCountry)
                return res.status(400).send("Неправильный тип изменения");
        }
    }

    parseChanges(name, changes)

    if (generalInfo.completed === numPlayers) {
        console.log("НОВЫЙ РАУНД");
        gameLogs.push(`==${generalInfo.round + 1} РАУНД==`)

        for (const names of attacks) {
            const [countryName, cityName] = names.split("/");
            const cityIndex = countries[countryName].cities.findIndex(
                (city) => city.name === cityName
            );
            newCountries[countryName].cities[cityIndex] = attack(
                newCountries[countryName],
                cityIndex
            );
        }
        attacks = [];

        newGeneralInfo.ecologyLvl.at(-1).lvl = Math.round(
            newGeneralInfo.ecologyLvl.at(-1).lvl
        );
        for (const key in newCountries) {
            countries[key] = structuredClone(
                next(newCountries[key], newGeneralInfo.ecologyLvl.at(-1).lvl)
            );
            newCountries[key].sanctionsFrom = [];
        }
        generalInfo = structuredClone(newGeneralInfo);
        generalInfo.completed = 0;
        newGeneralInfo = {
            completed: 0,
            round: generalInfo.round + 1,
            ecologyLvl: [
                ...generalInfo.ecologyLvl,
                {
                    round: generalInfo.round + 1,
                    lvl: generalInfo.ecologyLvl.at(-1).lvl,
                },
            ],
        };

        broadcastGameUpdate();
        return res
            .status(200)
            .json({ mesage: "final_turn_processed", isLast: true });
    }
    return res.status(200).json({ message: "data accepted", isLast: false, completed: generalInfo.completed });
});

app.get("/imgs/:name", (req, res) => {
    const name = req.params.name;
    if (existsSync(__dirname + `/imgs/${name}`)) {
        res.sendFile(__dirname + `/imgs/${name}`);
    }
    res.sendFile(__dirname + `/imgs/NotFound.png`);
});

app.post("/transfer", (req, res) => {
    const { countryName, transfers } = req.body;
    const password = req.cookies.session;

    const realCountryName = Object.keys(PASSWORDS).find(
        (k) => PASSWORDS[k] === password
    );
    if (
        !Object.values(PASSWORDS).includes(password) ||
        countryName !== realCountryName
    )
        return res.status(403).json("Доступ запрещен");

    for (const to in transfers) {
        if (!Object.keys(countries).includes(to)) {
            return res.status(400).send("Страны с указанным именем нет");
        }

        if (transfers[to] < 0) {
            return res.status(400).send("Есть перевод с отрицательным значением")
        }
    }

    const sum = Object.values(transfers).reduce((sum, cur) => sum + cur, 0);
    if (countries[countryName].balance < sum) {
        return res.status(400).send("Недостаточно средств");
    }

    for (const to in transfers) {
        const sum = transfers[to];
        if (sum === 0) continue;
        countries[countryName].balance -= sum;
        newCountries[countryName].balance -= sum;
        countries[to].balance += sum;
        newCountries[to].balance += sum;

        clients[to]?.write("event: transfer\n");
        clients[to]?.write(
            `data: ${JSON.stringify({
                ownCountry: {
                    balance: countries[countryName].balance,
                    transfers: countries[countryName].transfers
                },
                from: countryName,
                sum,
            })}\n\n`
        );
    }

    return res.status(200).json({
        balance: countries[countryName].balance,
        transfers: countries[countryName].transfers
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
    startGameConsole()
});
