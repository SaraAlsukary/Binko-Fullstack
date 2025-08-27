import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actGetNotificationsList = createAsyncThunk(
    "notifications/actGetNotificationsList",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.get(
                `/users/${id}/notifications`,
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

export default actGetNotificationsList;
