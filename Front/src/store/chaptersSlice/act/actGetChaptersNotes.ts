import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TResponse = {
    id: number,
    note: string
};

const actGetChaptersNotes = createAsyncThunk(
    "chapters/actGetChaptersNotes",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `chapters/${id}/note/`,
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

export default actGetChaptersNotes;
