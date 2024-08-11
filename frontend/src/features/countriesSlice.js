import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  items: [
    {
      name: "США",
      meanLiveLvl: null,
      cities: [],
    },
    {
      name: "Сев. Корея",
      meanLiveLvl: null,
      cities: [],
    },
    {
      name: "Ирак",
      meanLiveLvl: null,
      cities: [],
    },
    {
      name: "Греция",
      meanLiveLvl: null,
      cities: [],
    },
    {
      name: "Китай",
      meanLiveLvl: null,
      cities: [],
    },
    {
      name: "Франция",
      meanLiveLvl: null,
      cities: [],
    },
    {
      name: "Германия",
      meanLiveLvl: null,
      cities: [],
    },
  ],
};

export const fetchCountriesData = createAsyncThunk("countries/fetchCountriesData", async () => {
  const { data } = await axios.get("http://localhost:4444/countries");
  return data;
});

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountriesData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "completed";
      });
  },
});

export default countriesSlice.reducer;
