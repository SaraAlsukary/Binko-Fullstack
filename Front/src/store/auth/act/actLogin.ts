import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
    username: string;
    password: string;
};

type TResponse = {
    user: {
        id: number,
        is_supervisor: boolean,
        is_admin: boolean,
        username: string,
        name: string,
        image: string,
        discriptions: string,
    }
    message: string,
    token: string,
}

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
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLogin;
