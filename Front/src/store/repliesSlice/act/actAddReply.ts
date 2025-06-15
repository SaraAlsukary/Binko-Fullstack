import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { RootState } from "@store/index";
type TForm = {

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
                `addreply/${Formdata?.comment}/${auth?.userData?.user.id}/`,
                Formdata.reply,
                {
                    signal,
                    // headers: {
                    //     Authorization: `Bearer ${auth.userData?.user.token}`,
                    //     'Content-Type': 'application/json'
                    // },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddReply;
