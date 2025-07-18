import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type FormData = {
    user: number,
    book: number,
    value: number
}
const actAddRating = createAsyncThunk(
    "books/actAddRating",
    async (Formdata: FormData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;


        try {
            const response = await axios.post(
                `rate/${Formdata.user}/${Formdata.book}/`, { value: Formdata.value }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddRating;
