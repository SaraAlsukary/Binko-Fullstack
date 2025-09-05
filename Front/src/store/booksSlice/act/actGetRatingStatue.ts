import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
type TRating = {
    id_book: number,
    id_user: number,
}
type TResponse = { rated: boolean, rating_value: number };
const actGetRatingStatue = createAsyncThunk(
    "books/actGetRatingStatue",
    async (form: TRating, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `check-rating/${form?.id_user}/${form?.id_book}/`,
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

export default actGetRatingStatue;
