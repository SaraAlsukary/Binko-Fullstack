import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TChapters } from "@customtypes/chaptersType";
// import { RootState } from "@store/index";

type TResponse = TChapters[];
const actAddChapter = createAsyncThunk(
    "chapters/actAddChapter",
    async (Formdata: object, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        // const { auth } = getState() as RootState;
        try {
            const response = await axios.post<TResponse>(
                `books/${Formdata.book_id}/add-chapter/`, Formdata.dataform,
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

export default actAddChapter;
