import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
type TData = {
    id: number,
    name: string,
    username: string,
    category: string
}
const actUpdateSupervisor = createAsyncThunk(
    "auth/actUpdateSupervisor",
    async (formData: TData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            await axios.put(`update-user/${formData.id}/`, formData, {
            });
            return formData;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actUpdateSupervisor;
