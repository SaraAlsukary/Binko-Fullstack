import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actDeleteUser = createAsyncThunk(
    "users/actDeleteUser",
    async (user_id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        const data: object = {
            user_id,
        }
        try {
            const response = await axios.delete(
                'delete-user/', JSON.parse(data)
                // {
                //     signal,
                // }
            );
            // console.log(response)
            return response;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteUser;
