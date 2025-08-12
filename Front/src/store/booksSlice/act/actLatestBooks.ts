import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


// type TResponse = [];
const actLatestBooks = createAsyncThunk(
    "books/actLatestBooks",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;


        try {
            const response = await axios.get(
                `books/latest/`,

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLatestBooks;
