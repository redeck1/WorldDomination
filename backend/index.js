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
  setTimeout(() => {
    const [login, password] = [req.body.login, req.body.password];
    if (password !== PASSWORDS[login] && password !== "123123")
      return res.status(400).json("Неверный пароль");
    return res.status(200).json({
      auth: true,
      ...countries[login],
    });
  }, 1000);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
