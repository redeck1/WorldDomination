import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = ["Логи появятся после завершения 6 раунда"];

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
    const { data } = await axios.get(`${apiUrl}/logs`);
    return data;
});

const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        setLogs(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogs.fulfilled, (state, action) => {
            return action.payload.logs;
        });
    },
});

export const { setLogs } = logsSlice.actions;

export default logsSlice.reducer;
