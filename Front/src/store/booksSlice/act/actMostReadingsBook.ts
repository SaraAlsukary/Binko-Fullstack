import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


// type TResponse = [];
const actMostReadingsBooks = createAsyncThunk(
    "books/actMostReadingsBooks",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
  

        try {
            const response = await axios.get(
                `books/most-read/`,
              
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actMostReadingsBooks;
