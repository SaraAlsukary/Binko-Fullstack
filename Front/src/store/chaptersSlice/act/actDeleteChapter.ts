import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actDeleteChapters = createAsyncThunk(
    "chapters/actDeleteChapters",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
             await axios.delete(
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
