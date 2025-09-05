import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TReplies } from "@customtypes/replyType";

type TForm = {
    rep:number,
    comment: number,
    user: number,
    content: string
}
type TResponse = TReplies;
const actAddReplyToReply = createAsyncThunk(
    "replies/actAddReplyToReply",
    async (Formdata: TForm, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post<TResponse>(
                `comments/${Formdata.comment}/reply/${Formdata.rep}/user/${Formdata?.user}/`,
                { content: Formdata.content }
              
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddReplyToReply;
