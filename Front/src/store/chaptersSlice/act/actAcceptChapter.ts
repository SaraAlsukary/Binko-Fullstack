import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";



const actAcceptChapters = createAsyncThunk(
    "chapters/actAcceptChapters",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;


        try {
            const response = await axios.patch(
                `chapters/${id}/accept/`,
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

export default actAcceptChapters;
