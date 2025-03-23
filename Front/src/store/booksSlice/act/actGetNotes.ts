import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TResponse = {
    id: number,
    note: string
};

const actGetNotes = createAsyncThunk(
    "books/actGetNotes",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `get/books/${id}/note/`,
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

export default actGetNotes;
