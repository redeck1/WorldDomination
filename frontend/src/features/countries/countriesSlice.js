import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "США",
    mean: 57,
    cities: [
      { name: "Вашингтон", liveLvl: 58, isAlive: true },
      { name: "Нью-Йорк", liveLvl: 57, isAlive: true },
      { name: "Мемфис", liveLvl: 57, isAlive: true },
      { name: "Майами", liveLvl: 57, isAlive: true },
    ],
  },
  {
    name: "Сев. Корея",
    mean: 75,
    cities: [
      { name: "Пхеньян", liveLvl: 57, isAlive: true },
      { name: "Хамхын", liveLvl: 57, isAlive: true },
      { name: "Чхонджин", liveLvl: 59, isAlive: true },
      { name: "Нампхо", liveLvl: 57, isAlive: false },
    ],
  },
  {
    name: "Ирак",
    mean: 60,
    cities: [
      { name: "Багдад", liveLvl: 57, isAlive: true },
      { name: "Мосул", liveLvl: 57, isAlive: true },
      { name: "Эрбиль", liveLvl: 32, isAlive: true },
      { name: "Басра", liveLvl: 57, isAlive: true },
    ],
  },
  {
    name: "Греция",
    mean: 60,
    cities: [
      { name: "Афины", liveLvl: 57, isAlive: true },
      { name: "Салоники", liveLvl: 57, isAlive: true },
      { name: "Патры", liveLvl: 32, isAlive: true },
      { name: "Лариса", liveLvl: 57, isAlive: true },
    ],
  },
  {
    name: "Китай",
    mean: 60,
    cities: [
      { name: "Пекин", liveLvl: 57, isAlive: true },
      { name: "Шанхай", liveLvl: 57, isAlive: true },
      { name: "Чунцин", liveLvl: 32, isAlive: true },
      { name: "Гуанчжоу", liveLvl: 57, isAlive: true },
    ],
  },
  {
    name: "Франция",
    mean: 60,
    cities: [
      { name: "Париж", liveLvl: 57, isAlive: true },
      { name: "Марсель", liveLvl: 57, isAlive: true },
      { name: "Лион", liveLvl: 32, isAlive: true },
      { name: "Ницца", liveLvl: 57, isAlive: true },
    ],
  },
  {
    name: "Германия",
    mean: 60,
    cities: [
      { name: "Берлин", liveLvl: 57, isAlive: true },
      { name: "Гамбург", liveLvl: 57, isAlive: true },
      { name: "Мюнхен", liveLvl: 32, isAlive: true },
      { name: "Кёльн", liveLvl: 57, isAlive: true },
    ],
  },
];

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
