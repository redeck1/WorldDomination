import { configureStore } from "@reduxjs/toolkit";
import countriesReduser from "../features/countries/countriesSlice";
import ownCountryReduser from "../features/ownCountry/ownCountrySlice";

export const store = configureStore({
  reducer: {
    countries: countriesReduser,
    ownCountry: ownCountryReduser,
  },
});
