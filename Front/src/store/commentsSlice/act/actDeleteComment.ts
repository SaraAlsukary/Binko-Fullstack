import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@store/index";

import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TComment } from "@customtypes/commentType";

// type TResponse = TComment[];

const actDeleteComment = createAsyncThunk(
    "comments/actDeleteComment",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.delete(`comments/${id}/`, { signal });
            return response;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteComment;
