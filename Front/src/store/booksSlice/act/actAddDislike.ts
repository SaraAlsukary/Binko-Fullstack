import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TForm = {
    book_id: number,
    user_id: number
}

const actAddDislike = createAsyncThunk(
    "books/actAddDislike",
    async (form: TForm, thunkAPI) => {

        const { rejectWithValue } = thunkAPI;

        try {
            const response = await axios.post(
                `books/dislike/`, form,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)

            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddDislike;
