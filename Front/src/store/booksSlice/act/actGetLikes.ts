import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
// import { TBooks } from "@customtypes/booksTypes";
// import { RootState } from "@store/index";
import { TLikes } from "@customtypes/LikesType";

type TResponse = TLikes;
const actGetLikes = createAsyncThunk(
    "books/actGetLikes",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.get<TResponse>(
                `books/${id}/likes/`,
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

export default actGetLikes;
