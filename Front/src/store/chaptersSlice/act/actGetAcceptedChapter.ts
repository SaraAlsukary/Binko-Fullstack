import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TChapters } from "@customtypes/chaptersType";

type TResponse = TChapters[];

const actGetAcceptedChapters = createAsyncThunk(
    "chapters/actGetAcceptedChapters",
    async (_, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                // `books/${id}/chapters/`,
                `unaccepted-chapters/`,
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

export default actGetAcceptedChapters;
