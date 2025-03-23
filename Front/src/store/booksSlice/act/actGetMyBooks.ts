import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";

type TResponse = TBooks[];

const actGetMyBooks = createAsyncThunk(
    "books/actGetMyBooks",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `mybook/${id}`,
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

export default actGetMyBooks;
