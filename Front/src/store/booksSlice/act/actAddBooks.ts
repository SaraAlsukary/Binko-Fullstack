import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { RootState } from "@store/index";
import { TBooks } from "@customtypes/booksTypes";

type TResponse = TBooks[];
const actAddBooks = createAsyncThunk(
    "books/actAddBooks",
    async (Formdata: FormData, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.post<TResponse>(
                `/books/catname/${auth?.userData?.user.id}/`, Formdata,
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
