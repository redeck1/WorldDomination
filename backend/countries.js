import  config  from "./game-config.json" with {type: "json"};

export const COUNTRIES = {
    США: ["Вашингтон", "Нью-Йорк", "Мемфис", "Майами"],
    Россия: ["Москва", "Санкт-Петербург", "Новосибирск", "Владивосток"],
    Китай: ["Пекин", "Шанхай", "Чунцин", "Гуанчжоу"],
    "Сев. Корея": ["Пхеньян", "Хамхын", "Чхонджин", "Нампхо"],
    Германия: ["Берлин", "Гамбург", "Мюнхен", "Кёльн"],
    Франция: ["Париж", "Марсель", "Лион", "Ницца"],
    Ирак: ["Багдад", "Мосул", "Эрбиль", "Басра"],
    Греция: ["Афины", "Салоники", "Патры", "Лариса"],
};

const numPlayers = config.numPlayers

function Country(name, citiesName) {
    this.name = name;
    this.isComplete = false;
    this.balance = 1000;
    this.meanLiveLvl = 54;
    this.isHaveNuclearTech = false;
    this.bombs = 0;
    this.sanctionsFrom = [];
    this.transfers = Object.keys(COUNTRIES)
        .slice(0, numPlayers)
        .filter((item) => item !== name)
        .reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
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
    .reduce(
        (prev, curr) => ({
            ...prev,
            [curr]: new Country(curr, COUNTRIES[curr]),
        }),
        {}
    );

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
    country.balance += Math.round(
        country.cities.reduce((sum, city) => sum + city.profit, 0)
    );
    country.cities = country.cities
        .map((city) => ({
            ...city,
            liveLvl: Math.round((city.growth * ecologyLvl) / 100),
        }))
        .map((city) => ({ ...city, profit: 3 * city.liveLvl }));
    country.meanLiveLvl = Math.round(
        country.cities.reduce((sum, city) => sum + city.liveLvl, 0) / 4
    );
    country.isComplete = false;
    return country;
}

export default countries;
