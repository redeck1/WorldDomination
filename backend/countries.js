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

function Country(name, citiesName) {
  this.name = name;
  this.balance = 1000;
  this.meanLiveLvl = 54;
  this.isHaveNuclearTech = false;
  this.bombs = 0;
  this.sanctionsFrom = [];
  this.cities = citiesName.reduce((prev, item) => {
    prev.push({
      name: item,
      liveLvl: 54,
      profit: 200,
      growth: 60,
      isHaveShield: false,
      isAlive: true,
    });
    return prev;
  }, []);
}

const countries = Object.keys(COUNTRIES).reduce(
  (prev, curr) => ({ ...prev, [curr]: new Country(curr, COUNTRIES[curr]) }),
  {}
);
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

export default countries;
