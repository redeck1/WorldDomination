import { createSlice } from "@reduxjs/toolkit";

const initialState = ["Здесь пока ничего нет"];

const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        setLogs(state, action) {
            return action.payload;
        },
    },
});

export const { setLogs } = logsSlice.actions;

export default logsSlice.reducer;
