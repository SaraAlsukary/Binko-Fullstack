import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
    username: string;
    password: string;
};

type TResponse = {
    name: string,
    username: string,
    is_admin: boolean,
    is_supervisor: boolean
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
