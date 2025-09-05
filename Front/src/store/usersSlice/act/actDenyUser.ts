import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actDenyUser = createAsyncThunk(
    "users/actDenyUser",
    async (user_id: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const response = await axios.post(
                `reject-user/${user_id}/  `,

            );
            return response;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDenyUser;
