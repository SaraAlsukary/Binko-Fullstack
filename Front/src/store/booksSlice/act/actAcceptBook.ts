import { createAsyncThunk,  } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


// type TResponse = [];
const actAcceptBooks = createAsyncThunk(
    "books/actAcceptBooks",
    async (id: number, thunkAPI) => {
        const { rejectWithValue,  signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.patch(
                `books/${id}/accept/`,
                {
                    signal,
                    // headers: {
                    //     Authorization: `Bearer ${auth.user?.token}`
                    // }
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAcceptBooks;
