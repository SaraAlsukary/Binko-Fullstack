import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


type TNote = {
    id: number,
    note: string
};
const actDenyChapters = createAsyncThunk(
    "chapters/actDenyChapters",
    async (form: TNote, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        // const { auth } = getState() as RootState;

        try {
            const response = await axios.patch<TNote>(
                `chapters/${form.id}/note/`, form,
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

export default actDenyChapters;
