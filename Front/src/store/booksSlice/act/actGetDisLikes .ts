import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TDislikes } from "@customtypes/DislikeType";


type TResponse = TDislikes;
const actGetDisLikes = createAsyncThunk(
    "books/actGetDisLikes ",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `books/${id}/dislikes/`,
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

export default actGetDisLikes;
