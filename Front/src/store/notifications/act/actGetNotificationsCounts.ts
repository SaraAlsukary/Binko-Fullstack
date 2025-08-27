import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actGetNotificationsCounts = createAsyncThunk(
    "notifications/actGetNotificationsCounts",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.get(
                `users/${id}/notifications/unread-count/`,
                {

                    signal,

                },
            );

            return response.data.unread_count;
        } catch (error) {

            return rejectWithValue(axiosErrorHandler(error));

        }
    }
);

export default actGetNotificationsCounts;
