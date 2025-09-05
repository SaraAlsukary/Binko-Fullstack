import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


type TForm = {
    id: number,
    formdata: FormData
}
const actUpdateCategory = createAsyncThunk(
    "categories/actUpdateCategory",
    async (form: TForm, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.put(
                `update/categories/${form.id}/`, form.formdata,
                {
                    signal,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actUpdateCategory;
