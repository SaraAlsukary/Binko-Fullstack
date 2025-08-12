import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TLikes } from "@customtypes/LikesType";

type TResponse = TLikes;
type TForm = {
    book_id: number,
    user_id: number
}

const actRemoveDislike = createAsyncThunk(
    "books/actRemoveDislike",
    async (form: TForm, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const response = await axios.delete<TResponse>(
                `dislike/remove/?book_id=${form.book_id}&user_id=${form.user_id}`,

            );
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actRemoveDislike;
