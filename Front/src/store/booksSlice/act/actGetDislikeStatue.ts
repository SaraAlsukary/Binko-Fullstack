import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
type TLike = {
    id_book: number,
    id_user: number,
}
type TResponse = { dis_liked: boolean } ;
const actGetDislikeStatue = createAsyncThunk(
    "books/actGetDislikeStatue",
    async (form: TLike, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `dislike-status/${form?.id_user}/${form?.id_book}/`,
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

export default actGetDislikeStatue;
