import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TResponse = {};
const actEditBook = createAsyncThunk(
    "books/actEditBook",
    async (Formdata: FormData, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.put<TResponse>(
                `update_book/${Formdata.get('id')}/`, Formdata,
                {
                    signal,
                    // headers: {
                    //     Authorization: `Bearer ${auth.user?.token}`
                    // }
                },
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actEditBook;
