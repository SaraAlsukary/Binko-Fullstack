import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TChapters } from "@customtypes/chaptersType";

type TResponse = TChapters[];

const actGetChapters = createAsyncThunk(
    "books/actGetChapters",
    async (id, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `chapters?book_id=${id}/`,
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

export default actGetChapters;
