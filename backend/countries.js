const COUNTRIES = {
  США: ["Вашингтон", "Нью-Йорк", "Мемфис", "Майами"],
  "Сев. Корея": ["Пхеньян", "Хамхын", "Чхонджин", "Нампхо"],
  Ирак: ["Багдад", "Мосул", "Эрбиль", "Басра"],
  Греция: ["Афины", "Салоники", "Патры", "Лариса"],
  Китай: ["Пекин", "Шанхай", "Чунцин", "Гуанчжоу"],
  Франция: ["Париж", "Марсель", "Лион", "Ницца"],
  Германия: ["Берлин", "Гамбург", "Мюнхен", "Кёльн"],
  Россия: ["Москва", "Санкт-Петербург", "Новосибирск", "Владивосток"],
};

export const numPlayers = 2;

function Country(name, citiesName) {
  this.name = name;
  this.isComplete = false;
  this.balance = 1000;
  this.meanLiveLvl = 54;
  this.isHaveNuclearTech = false;
  this.bombs = 0;
  this.sanctionsFrom = [];
  this.changes = [];
  this.cities = citiesName.reduce(
    (prev, item) => [
      ...prev,
      {
        name: item,
        liveLvl: 54,
        profit: (300 * 54) / 100,
        growth: 60,
        isHaveShield: false,
        isAlive: true,
      },
    ],
    []
  );
}

const countries = Object.keys(COUNTRIES)
  .slice(0, numPlayers)
  .reduce((prev, curr) => ({ ...prev, [curr]: new Country(curr, COUNTRIES[curr]) }), {});

/*
{США: Country {
  name: 'США',
  balance: 1000,
  meanLiveLvl: 54,
  isHaveNuclearTech: false,
  bombs: 0,
  sanctionsFrom: [],
  cities: [
    {
      name: 'Вашингтон',
      liveLvl: 54,
      profit: 200,
      growth: 30,
      isHaveShield: false,
      isAlive: true
    },
    ...]
} ...}
*/

//Функция для подготовки данных к отправке пользователю (Нужны не все поля)
export function prepareCountries(countries) {
  const preparedCountries = [];
  for (let key in countries) {
    preparedCountries.push({
      name: countries[key].name,
      meanLiveLvl: countries[key].meanLiveLvl,
      cities: countries[key].cities.map((city) => ({
        name: city.name,
        liveLvl: city.liveLvl,
        isAlive: city.isAlive,
      })),
    });
  }
  return preparedCountries;
}

export function attack(country, cityIndex) {
  const city = country.cities[cityIndex];
  if (city.isHaveShield) {
    city.isHaveShield = false;
  } else {
    city.isAlive = false;
    city.growth = 0;
  }
  return city;
}

export function next(country, ecologyLvl) {
  country.balance += Math.round(country.cities.reduce((sum, city) => sum + city.profit, 0));
  country.cities = country.cities
    .map((city) => ({ ...city, liveLvl: Math.round((city.growth * ecologyLvl) / 100) }))
    .map((city) => ({ ...city, profit: 3 * city.liveLvl }));
  country.meanLiveLvl = Math.round(country.cities.reduce((sum, city) => sum + city.liveLvl, 0) / 4);
  country.isComplete = false;
  return country;
}

export default countries;
