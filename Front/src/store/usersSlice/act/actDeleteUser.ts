import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actDeleteUser = createAsyncThunk(
    "users/actDeleteUser",
    async (user_id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.delete(
                `delete-user/${user_id}  `,
                
            );
            return user_id;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteUser;
