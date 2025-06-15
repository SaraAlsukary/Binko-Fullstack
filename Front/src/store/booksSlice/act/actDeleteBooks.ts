import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


const actDeleteBook = createAsyncThunk(
    "books/actDeleteBook",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.delete(
                `delete/books/${id}/`,
                {
                    signal,
                 
                },
            );
            return id;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteBook;
