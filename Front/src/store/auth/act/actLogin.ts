import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
    username: string;
    password: string;
};

type TResponse = {
    message: string,
    token: string,
    username: boolean,
    user_type: string,
    id: number
};

const actLogin = createAsyncThunk(
    "auth/actLogin",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>("login/", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            }
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLogin;
