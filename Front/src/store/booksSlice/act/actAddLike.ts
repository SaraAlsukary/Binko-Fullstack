import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { RootState } from "@store/index";
import { TLikes } from "@customtypes/LikesType";

type TResponse = TLikes;
const actAddLikes = createAsyncThunk(
    "books/actAddLikes",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const response = await axios.post<TResponse>(
                `like/${auth.userData?.user.id}/${id}/`,
                {
                    signal,
                   
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddLikes;
