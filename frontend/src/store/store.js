import { configureStore } from "@reduxjs/toolkit";
import countriesReduser from "../features/countriesSlice";
import ownCountryReduser from "../features/ownCountrySlice";
import { gameSseMiddleware } from "../middleware/SSEMiddleware";

export const store = configureStore({
    reducer: {
        countries: countriesReduser,
        ownCountry: ownCountryReduser,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameSseMiddleware),
});
