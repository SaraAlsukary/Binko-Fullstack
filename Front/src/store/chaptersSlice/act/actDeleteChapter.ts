import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TBooks } from "@customtypes/booksTypes";
import { RootState } from "@store/index";

// type TResponse = [];
const actDeleteChapters = createAsyncThunk(
    "chapters/actDeleteChapters",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.delete(
                `delete-chapter/${id}/`,
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
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteChapters;
