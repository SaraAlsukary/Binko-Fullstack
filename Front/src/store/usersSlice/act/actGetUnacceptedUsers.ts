import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TUser } from "@customtypes/userType";

type TResponse = TUser[];

const actGetUnacceptedUsers = createAsyncThunk(
    "users/actGetUnacceptedUsers",
    async (_, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                'users/unaccepted/',
                {
                    signal,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetUnacceptedUsers;
