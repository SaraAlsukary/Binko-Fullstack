import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actAcceptUser = createAsyncThunk(
    "users/actAcceptUser",
    async (user_id: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const response = await axios.post(
                `users/${user_id}/accept/  `,

            );
            return response;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAcceptUser;
