import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TComment } from "@customtypes/commentType";

type TResponse = TComment[];

const actGetCommentByBook = createAsyncThunk(
    "comments/actGetCommentByBook",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(`books/${id}/comments`, { signal });
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetCommentByBook;
