import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

import { RootState } from "@store/index";
interface TForm {
    id: number
    commentData: {
        comment: string,
    }
}
type TResponse = [];
const actAddComments = createAsyncThunk(
    "comments/actAddComments",
    async (Formdata: TForm, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.post<TResponse>(

                `users/${auth.userData?.user?.id}/books/${Formdata.id}/comment/`, Formdata.commentData,
                {

                },
            );
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddComments;
