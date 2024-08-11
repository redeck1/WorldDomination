import { configureStore } from "@reduxjs/toolkit";
import countriesReduser from "../features/countriesSlice";
import ownCountryReduser from "../features/ownCountrySlice";

export const store = configureStore({
  reducer: {
    countries: countriesReduser,
    ownCountry: ownCountryReduser,
  },
});
