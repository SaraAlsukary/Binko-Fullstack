import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";

type TResponse = [];
const actAddBooks = createAsyncThunk(
    "books/actAddBooks",
    async (Formdata: FormData, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.post<TResponse>(
                `books/add/${auth?.userData.user.id}/`, Formdata,
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

export default actAddBooks;
