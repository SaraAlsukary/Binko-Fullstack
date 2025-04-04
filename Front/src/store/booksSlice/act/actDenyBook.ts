import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";

type TNote = {
    id: number,
    note: string
};
// type TResponse = [];
const actDenyBooks = createAsyncThunk(
    "books/actDenyBooks",
    async (form: TNote, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.patch<TNote>(
                `books/${form.id}/note/`, form,

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

export default actDenyBooks;
