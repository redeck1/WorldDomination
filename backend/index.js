import express from "express";
import cors from "cors";
import countries, { prepareCountries, next, numPlayers, attack } from "./countries.js";
import { existsSync } from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PASSWORDS = {
  США: "pSJzymBZNOEzALyZT1t3CMmUyMSIZ1kc",
  "Сев. Корея": "ayRGhJRAwTsjf8RDC4nQbXTF8AvM4tZU",
  Ирак: "REjGyTgMtiJZo5xIW9B9Wz68L69PrfpX",
  Греция: "rez7cnTVHRr7mv2uVRPgUSd9MNGqZ819",
  Китай: "anOMx1SbpqO7lcneEu6AodSkA4L5miMz",
  Франция: "cXQ6RHYqThWgVtrMXASVjXqwVcWB5P03",
  Германия: "avWtZdtFO0HdpAOU2dOgDxxFkJRGIZsx",
  Россия: "HpEJC4YfPOHcpVI3g7dsJ59gFe3Z7cVG",
};

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
    { round: generalInfo.round + 1, lvl: generalInfo.ecologyLvl.at(-1).lvl },
  ],
};
const newCountries = structuredClone(countries);
let attacks = [];

const corsOptions = {
  origin: 'http://localhost:3000',  // Или '*' для любого домена (небезопасно!)
  methods: ['GET', 'POST', 'DELETE', 'UPDATE']
};

const PORT = process.env.PORT || 4444;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + "/imgs"));

app.use("/", (req, res, next) => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const data = `${hour}:${minutes}:${seconds}:${milliseconds} ${req.method} ${req.url}`;
  console.log(data);

  next();
});

app.get("/countries", (req, res) => {
  return res.status(200).json(prepareCountries(countries));
});

app.post("/login", (req, res) => {
  const [login, password] = [req.body.login, req.body.password];
  if (password !== PASSWORDS[login] && password !== "123123")
    return res.status(400).json("Неверный пароль");
  return res.status(200).json({
    auth: true,
    ...countries[login],
    ...generalInfo,
  });
});

app.post("/next", (req, res) => {
  const { name, changes } = req.body;
  if (countries[name].isComplete) {
    return res.status(400).json("Эта страна уже завершила ход");
  } else {
    countries[name].isComplete = true;
    generalInfo.completed += 1;
  }

  for (let change of changes) {
    switch (change.type) {
      case "eco":
        let lvl = newGeneralInfo.ecologyLvl.at(-1).lvl;
        if (lvl + change.cost > 0) {
          lvl += change.cost;
        } else {
          lvl = 1;
        }
        newGeneralInfo.ecologyLvl.at(-1).lvl = lvl;
        break;

      case "sanction":
        newCountries[change.to].sanctionsFrom.push(name);
        newCountries[change.to].balance -= 40
        break;

      case "atack":
        newCountries[name].bombs -= 1;
        attacks.push(change.name);
        break;

      case "expense":
        newCountries[name].balance -= change.cost;

        if (change.name === "Развитие ядерной технологии") {
          newCountries[name].isHaveNuclearTech = true;
        } else if (change.name.includes("Улучшение") || change.name.includes("Щит")) {
          const cityName = change.name.split(" ").at(-1);
          const index = newCountries[name].cities.findIndex((city) => city.name === cityName);

          change.name.includes("Улучшение")
            ? (newCountries[name].cities[index].growth += 10)
            : (newCountries[name].cities[index].isHaveShield = true);
        } else if (change.name === "Строительство бомб") {
          if (countries[name].isHaveNuclearTech === true) {
            newCountries[name].bombs += change.count;
          } else {
            return res.status(400).send("Ядерная технология не развита");
          }
        }
        break;

      default:
        return res.status(400).send("Неправильный тип изменения");
    }
  }
  if (generalInfo.completed === numPlayers) {
    console.log("НОВЫЙ РАУНД");
    for (const names of attacks) {
      const [countryName, cityName] = names.split("/");
      const cityIndex = countries[countryName].cities.findIndex((city) => city.name === cityName);
      newCountries[countryName].cities[cityIndex] = attack(newCountries[countryName], cityIndex);
    }
    attacks = [];

    newGeneralInfo.ecologyLvl.at(-1).lvl = Math.round(newGeneralInfo.ecologyLvl.at(-1).lvl);
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
        { round: generalInfo.round + 1, lvl: generalInfo.ecologyLvl.at(-1).lvl },
      ],
    };
  }
  return res.status(200).json("data accepted");
});

app.get("/update_info", (req, res) => {
  const countryName = req.query.country_name;
  return res.status(200).json({
    countries: prepareCountries(countries),
    ownCountry: { ...countries[countryName], ...generalInfo },
  });
});

app.get("/imgs/:name", (req, res) => {
  const name = req.params.name;
  if (existsSync(__dirname + `/imgs/${name}`)) {
    res.sendFile(__dirname + `/imgs/${name}`);
  }
  res.sendFile(__dirname + `/imgs/NotFound.png`);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
