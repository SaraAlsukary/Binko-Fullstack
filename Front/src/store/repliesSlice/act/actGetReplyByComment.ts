import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TReplies } from "@customtypes/replyType";

type TResponse = TReplies[];

const actGetReplyByComment = createAsyncThunk(
    "replies/actGetReplyByComment",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(`getreplys/${id}/`, { signal });
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetReplyByComment;
