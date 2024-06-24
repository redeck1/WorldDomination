import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Россия",
  mean: 57,
  balance: 500,
  isHaveNuclearTech: false,
  nuclearTech: false, // развивать ли ядерную технологию
  ecology: false,
  expenses: [],
  cities: [
    {
      name: "Москва",
      image: "00",
      liveLVL: 12,
      profit: 200,
      growth: 30,
      isHaveShield: false,
      isAlive: true,
    },
    {
      name: "Санкт-Петербург",
      image: "01",
      liveLVL: 12,
      profit: 200,
      growth: 30,
      isHaveShield: false,
      isAlive: true,
    },
    {
      name: "Новосибирск",
      image: "02",
      liveLVL: 12,
      profit: 200,
      growth: 30,
      isHaveShield: false,
      isAlive: true,
    },
    {
      name: "Владивосток",
      image: "03",
      liveLVL: 12,
      profit: 200,
      growth: 30,
      isHaveShield: false,
      isAlive: true,
    },
  ],
};

const ownCountrySlice = createSlice({
  name: "ownCountry",
  initialState,
  reducers: {
    changeEco(state, action) {
      state.ecology = action.payload;
      if (action.payload) {
        state.expenses.push({ name: "Улучшение экологии", cost: 150 });
        state.balance -= 150;
      } else {
        state.balance += 150;
        state.expenses = state.expenses.filter((item) => item.name !== "Улучшение экологии");
      }
    },
    changeTech(state, action) {
      state.nuclearTech = action.payload;
      if (action.payload) {
        state.expenses.push({ name: "Развитие ядерной технологии", cost: 500 });
        state.balance -= 500;
      } else {
        state.balance += 500;
        state.expenses = state.expenses.filter(
          (item) => item.name !== "Развитие ядерной технологии"
        );
      }
    },
  },
});

export const { changeEco, changeTech } = ownCountrySlice.actions;

export default ownCountrySlice.reducer;
