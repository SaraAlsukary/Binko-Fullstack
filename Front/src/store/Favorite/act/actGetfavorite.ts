import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";

type TResponse = TBooks[];
const actGetfavorite = createAsyncThunk(
    "books/actGetBooks",
    async (accessToken, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `favorite-books/`,
                {
                    signal,
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetfavorite;
