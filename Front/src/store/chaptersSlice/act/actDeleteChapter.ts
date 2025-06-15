import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actDeleteChapters = createAsyncThunk(
    "chapters/actDeleteChapters",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;

        try {
            const response = await axios.delete(
                `delete-chapter/${id}/`,
                {
                    signal,
                },
            );
            return id;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteChapters;
