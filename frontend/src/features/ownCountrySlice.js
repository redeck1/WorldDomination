import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  auth: false,
  status: "idle",
  round: null,
  ecologyLvl: null,
  name: null,
  meanLiveLvl: null,
  balance: null,
  bombs: null,
  isHaveNuclearTech: null,
  nuclearTech: false, // развивать ли ядерную технологию
  ecology: false,
  sanctionsFrom: null,
  changes: [],
  cities: null,
};

export const checkAuth = createAsyncThunk("checkAuth", async ({ login, password }) => {
  const { data } = await axios.post("http://localhost:4444/login", { login, password });
  return data;
});

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
    endStep(state, action) {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        return { ...state, status: "completed", ...action.payload };
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  changeEco,
  changeTech,
  changeSanction,
  changeCity,
  buildBombs,
  changeBombing,
  endStep,
} = ownCountrySlice.actions;

export const selectEco = (state) => state.ownCountry.changes.filter((item) => item.type === "eco");
export const selectExpense = (state) =>
  state.ownCountry.changes.filter((item) => item.type === "expense");

export default ownCountrySlice.reducer;
