import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "США",
    mean: 57,
    cities: [
      { name: "First", liveLvl: 58, isAlive: true },
      { name: "Second", liveLvl: 57, isAlive: true },
      { name: "Third", liveLvl: 57, isAlive: true },
      { name: "Fourth", liveLvl: 57, isAlive: true },
    ],
  },
  {
    name: "Сев. Корея",
    mean: 75,
    cities: [
      { name: "First", liveLvl: 57, isAlive: true },
      { name: "Second", liveLvl: 57, isAlive: true },
      { name: "Third", liveLvl: 59, isAlive: true },
      { name: "Fourth", liveLvl: 57, isAlive: false },
    ],
  },
  {
    name: "Ирак",
    mean: 60,
    cities: [
      { name: "First", liveLvl: 57, isAlive: true },
      { name: "Second", liveLvl: 57, isAlive: true },
      { name: "Third", liveLvl: 32, isAlive: true },
      { name: "Fourth", liveLvl: 57, isAlive: true },
    ],
  },
];

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
