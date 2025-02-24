import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TUser } from "@customtypes/userType";

type TResponse = TUser[];

const actGetSupervisor = createAsyncThunk(
    "supervisors/actGetSupervisor",
    async (_, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                'supervisors/',
                {
                    signal,
                }
            );
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetSupervisor;
