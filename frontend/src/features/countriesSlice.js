import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
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

export const fetchCountriesData = createAsyncThunk(
  "countries/fetchCountriesData",
  async () => {
    const { data } = await axios.get(`${apiUrl}/countries`);
    return data;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries(state, action) {
      state.items = action.payload;
    },
  },
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

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
