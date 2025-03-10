import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TComment } from "@customtypes/commentType";

// type TResponse = TComment[];

const actDeleteFavorite = createAsyncThunk(
    "favorite/actDeleteFavorite",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.delete(`book-favs/${id}/`, { signal });
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDeleteFavorite;
