import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actDeleteComment = createAsyncThunk(
    "comments/actDeleteComment",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.delete(`comments/${id}/`, { signal });
            return id;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteComment;
