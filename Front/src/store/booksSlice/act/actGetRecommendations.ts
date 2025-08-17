import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";

type TResponse = TBooks[];

const actGetRecommendations = createAsyncThunk(
    "books/actGetRecommendations",
    async (_, thunkAPI) => {
        const { rejectWithValue, signal, getState } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.get<TResponse>(
                `recommendations/${auth.userData?.user.id}`,
                {
                    signal,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetRecommendations;
