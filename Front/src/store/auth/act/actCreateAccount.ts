import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
type TFormData = {
    name: string;
    username: string;
    password: string;
    confirm_password: string;
};

const actCreateAccount = createAsyncThunk(
    "auth/actCreateAccount",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post("create-user/", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            });
            return res.data;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actCreateAccount;
