import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";
type TForm = {
    // user: number,
    // book: number,
    comment: number,
    user: number,
    reply: string
}
type TResponse = [];
const actAddReply = createAsyncThunk(
    "replies/actAddReply",
    async (Formdata: TForm, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;


        try {
            const response = await axios.post<TResponse>(
                `comments/${Formdata?.comment}/replies/
                `, Formdata,
                {
                    signal,
                    headers: {
                        Authorization: `Bearer ${auth.user?.token}`,
                        'Content-Type': 'application/json'
                    },
                },
            );
            console.log(response.data)
            console.log(auth.user?.token)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddReply;
