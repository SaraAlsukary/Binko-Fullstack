import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";
type TForm = {
    id: string
    commentData: {
        comment: string,
    }
}
type TResponse = [];
const actAddComments = createAsyncThunk(
    "comments/actAddComments",
    async (Formdata: TForm, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.post<TResponse>(
                `books/${Formdata.id}/users/${auth.userData.user?.id}/comments/
                `, Formdata.commentData,
                {
                    signal,
                    // headers: {
                    //     Authorization: `Bearer ${auth.user?.token}`
                    // }
                },
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddComments;
