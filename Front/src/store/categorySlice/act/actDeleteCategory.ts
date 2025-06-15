import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";



const actDeleteCategory = createAsyncThunk(
    "categories/actDeleteCategory",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.delete(
                `categories/${id}/`,
                {
                    signal,
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteCategory;
