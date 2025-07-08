import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TForm = {

    comment: number,
    user: number,
    content: string
}
type TResponse = [];
const actAddReply = createAsyncThunk(
    "replies/actAddReply",
    async (Formdata: TForm, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;



        try {
            const response = await axios.post<TResponse>(
                `addreply/${Formdata?.comment}/${Formdata?.user}/`,
                { content: Formdata.content }
              
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddReply;
