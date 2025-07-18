import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TForm = {

    comment: number,
    user: number,
    content: string
}
type TResponse = [];
const actAddReplyToComment = createAsyncThunk(
    "replies/actAddReplyToComment",
    async (Formdata: TForm, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;



        try {
            const response = await axios.post<TResponse>(
                `api/comments/${Formdata?.comment}/reply/${Formdata?.user}/`,
                { content: Formdata.content }
              
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddReplyToComment;
