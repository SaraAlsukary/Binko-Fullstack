import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TNote = {
    id: number,
    note: string
};
// type TResponse = [];
const actDenyBooks = createAsyncThunk(
    "books/actDenyBooks",
    async (form: TNote, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.post<TNote>(
                `books/${form.id}/reject/`, form,

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
