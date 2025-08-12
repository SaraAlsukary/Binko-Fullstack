import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


// type TResponse = [];
const actAddBookReading = createAsyncThunk(
    "books/actAddBookReading",
    async (form: { book_id: number }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;


        try {
            const response = await axios.post(
                `books/read/`, form

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddBookReading;
