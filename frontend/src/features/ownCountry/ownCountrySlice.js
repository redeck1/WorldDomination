import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  round: 1,
  name: "Россия",
  mean: 57,
  balance: 1000,
  bombs: 0,
  isHaveNuclearTech: false,
  nuclearTech: false, // развивать ли ядерную технологию
  ecology: false,
  changes: [],
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
        state.changes.push({ type: "expense", name: "Улучшение экологии", cost: 150 });
        state.changes.push({ type: "eco", name: "Улучшение экологии", cost: +10 });
        state.balance -= 150;
      } else {
        state.changes = state.changes.filter((item) => item.name !== "Улучшение экологии");
        state.balance += 150;
      }
    },
    changeTech(state, action) {
      state.nuclearTech = action.payload;
      if (action.payload) {
        state.changes.push({ type: "expense", name: "Развитие ядерной технологии", cost: 500 });
        state.changes.push({ type: "eco", name: "Развитие ядерной технологии", cost: -3 });
        state.balance -= 500;
      } else {
        state.balance += 500;
        state.changes = state.changes.filter((item) => item.name !== "Развитие ядерной технологии");
      }
    },
    changeSanction(state, action) {
      const { to, send } = action.payload;
      if (send) {
        state.changes.push({ type: "sanction", to: to });
      } else {
        state.changes = state.changes.filter(
          (item) => !(item.type === "sanction" && item.to === to)
        );
      }
    },
  },
});

export const { changeEco, changeTech, changeSanction } = ownCountrySlice.actions;

export const selectEco = (state) => state.ownCountry.changes.filter((item) => item.type === "eco");
export const selectExpense = (state) =>
  state.ownCountry.changes.filter((item) => item.type === "expense");

export default ownCountrySlice.reducer;
