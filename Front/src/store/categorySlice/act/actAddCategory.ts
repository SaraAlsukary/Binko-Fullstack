import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TCategory } from "@customtypes/categoryType";

// type TResponse = TCategory[];

const actAddCategory = createAsyncThunk(
    "categories/actAddCategory",
    async (form: FormData, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.post(
                `add-category/`, form,
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

export default actAddCategory;
