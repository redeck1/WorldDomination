import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import countriesReduser from "../features/countriesSlice";
import ownCountryReduser from "../features/ownCountrySlice";
import { gameSseMiddleware } from "../middleware/SSEMiddleware";
import { logger } from "../middleware/logger";

export const store = configureStore({
    reducer: {
        countries: countriesReduser,
        ownCountry: ownCountryReduser,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameSseMiddleware, logger),
});
