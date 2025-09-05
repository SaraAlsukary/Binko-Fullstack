import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TAuth } from "@customtypes/authType";

type TFormData = {
    username: string;
    password: string;
};



const actLogin = createAsyncThunk(
    "auth/actLogin",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post("login/", JSON.stringify(formData), {
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
