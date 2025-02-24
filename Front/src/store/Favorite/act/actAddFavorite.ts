import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";

type TResponse = [];
type TFav = { user: number, book: number };
const actAddFavorite = createAsyncThunk(
    "favorite/actAddFavorite",
    async (Formdata: TFav, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;

        try {
            const response = await axios.post(
                "add-favorite/", Formdata,
                {
                    headers: { 'Content-Type': 'application/json' },
                    signal,
                    // headers: {
                    //     Authorization: `Bearer ${auth.user?.token}`
                    // }
                },
            );
            console.log(response)
            return response.data;
        } catch (error) {
            // console.log(error)
            return rejectWithValue(axiosErrorHandler(error));

        }
    }
);

export default actAddFavorite;
