import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

import { TLikes } from "@customtypes/LikesType";

type TResponse = TLikes;
const actGetLikes = createAsyncThunk(
    "books/actGetLikes",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `books/${id}/likes/`,
                {
                    signal,
               
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetLikes;
