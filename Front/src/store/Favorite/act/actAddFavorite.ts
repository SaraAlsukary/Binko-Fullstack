import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
type TFav = { user: number, book: number };
const actAddFavorite = createAsyncThunk(
    "favorite/actAddFavorite",
    async (Formdata: TFav, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.post(
                "add-favorite/", Formdata,
                {
                    headers: { 'Content-Type': 'application/json' },
                    signal,

                },
            );
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));

        }
    }
);

export default actAddFavorite;
