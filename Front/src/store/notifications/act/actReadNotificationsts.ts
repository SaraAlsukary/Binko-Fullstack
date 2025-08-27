import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actReadNotifications = createAsyncThunk(
    "notifications/actReadNotifications",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.patch(
                `/users/${id}/notifications/read-all/`,
                {
                    signal,
                },
            );

            return response.data;
        } catch (error) {

            return rejectWithValue(axiosErrorHandler(error));

        }
    }
);

export default actReadNotifications;
