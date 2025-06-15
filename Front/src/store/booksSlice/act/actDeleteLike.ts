import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
// import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";
import { TLikes } from "@customtypes/LikesType";

type TResponse = TLikes;
const actDeleteLikes = createAsyncThunk(
    "books/actDeleteLikes",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.delete<TResponse>(
                `unlike/${auth.userData?.user.id}/${id}/`,
                {
                    signal,
                  
                },
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteLikes;
