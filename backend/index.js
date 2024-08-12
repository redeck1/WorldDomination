import express from "express";
import cors from "cors";
import countries, { prepareCountries } from "./countries.js";

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

const generalInfo = {
  completed: [],
  round: 1,
  ecologyLvl: [{ round: 1, lvl: 90 }],
};

const newGeneralInfo = {
  completed: [],
  round: generalInfo.round + 1,
  ecologyLvl: [
    ...generalInfo.ecologyLvl,
    { round: generalInfo.round + 1, lvl: generalInfo.ecologyLvl.at(-1).lvl },
  ],
};
const newCountries = structuredClone(countries);
const attacks = [];

const PORT = process.env.PORT || 4444;

const app = express();
app.use(express.json());
app.use(cors());

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
  if (!generalInfo.completed.includes(name)) {
    generalInfo.completed.push(name);
  } else {
    return res.status(400).json("Эта страна уже завершила ход");
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
        break;

      case "atack":
        attacks.push(change);
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

  newCountries[name].balance += newCountries[name].cities.reduce(
    (sum, city) => sum + city.profit,
    0
  );

  return res.status(200).json("data accepted");
});

app.get("/update_info", (_, res) => {
  res.status(200).json({ newGeneralInfo, newCountries, attacks });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
