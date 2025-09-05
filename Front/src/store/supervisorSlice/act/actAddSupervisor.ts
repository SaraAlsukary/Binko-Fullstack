import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
type TFormData = {
    name: string;
    username: string;
    password: string;
    confirm_password: string;
};
type TResponse = {
    name: string,
    username: string,
    is_admin: boolean,
    is_supervisor: boolean,
    image: string,
    discriptions: string
};
const actAddSupervisor = createAsyncThunk(
    "auth/actAddSupervisor",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>("create-supervisor/", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            });
            return res.data;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddSupervisor;
