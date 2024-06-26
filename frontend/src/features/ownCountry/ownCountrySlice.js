import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  round: 1,
  ecologyLvl: 90,
  name: "Россия",
  mean: 57,
  balance: 1000,
  bombs: 1,
  isHaveNuclearTech: false,
  nuclearTech: false, // развивать ли ядерную технологию
  ecology: false,
  sanctionsFrom: [],
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
        state.changes.push(
          { type: "expense", name: "Улучшение экологии", cost: 150 },
          { type: "eco", name: "Улучшение экологии", cost: 20 }
        );
        state.balance -= 150;
      } else {
        state.changes = state.changes.filter((item) => item.name !== "Улучшение экологии");
        state.balance += 150;
      }
    },
    changeTech(state, action) {
      state.nuclearTech = action.payload;
      if (action.payload) {
        state.changes.push(
          { type: "expense", name: "Развитие ядерной технологии", cost: 500 },
          { type: "eco", name: "Развитие ядерной технологии", cost: -3 }
        );
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
    changeCity(state, action) {
      const { name, type, bool } = action.payload;
      if (bool) {
        state.changes.push({
          type: "expense",
          name: type === "Улучшение" ? `Улучшение ${name}` : `Щит для ${name}`,
          cost: type === "Улучшение" ? 150 : 300,
        });
        state.balance -= type === "Улучшение" ? 150 : 300;
      } else {
        state.balance += type === "Улучшение" ? 150 : 300;
        state.changes = state.changes.filter(
          (item) => !(item.type === "expense" && item.name === `${type} ${name}`)
        );
      }
    },
    buildBombs(state, action) {
      const { count, waste } = action.payload;
      if (count !== 0) {
        state.balance = state.balance + waste - count * 150;
        const index = state.changes.findIndex(
          (item) => item.type === "expense" && item.name === "Строительство бомб"
        );
        if (index === -1) {
          state.changes.push(
            { type: "expense", name: "Строительство бомб", cost: count * 150, count: count },
            { type: "eco", name: "Строительство бомб", cost: -0.6 }
          );
        } else {
          state.changes[index].cost = count * 150;
          state.changes[index].count = count;
        }
      } else {
        state.balance += waste;
        state.changes = state.changes.filter((item) => item.name !== "Строительство бомб");
      }
    },
    changeBombing(state, action) {
      const { name, bool } = action.payload;
      if (bool) {
        state.bombs -= 1;
        state.changes.push(
          { type: "atack", name: name },
          { type: "eco", name: "Ядерная бомбордировка", cost: -10 }
        );
      } else {
        state.bombs += 1;
        state.changes = state.changes.filter(
          (item) => item.name !== name && item.name !== "Ядерная бомбордировка"
        );
      }
    },
  },
});

export const { changeEco, changeTech, changeSanction, changeCity, buildBombs, changeBombing } =
  ownCountrySlice.actions;

export const selectEco = (state) => state.ownCountry.changes.filter((item) => item.type === "eco");
export const selectExpense = (state) =>
  state.ownCountry.changes.filter((item) => item.type === "expense");

export default ownCountrySlice.reducer;
