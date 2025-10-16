import { TBooks } from "@customtypes/booksTypes";
import { createSlice } from "@reduxjs/toolkit";
import actShowBook from "./act/actShowBook";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "antd/es/button";

interface IState {
    bookInfo:TBooks |null,
    book: number | null,
    loading:TLoading,
    error:null | string,
    chapter: number | null,
    checkpoint: number | null;
}
const initialState: IState = {
    bookInfo:null,
    error:null,
    loading:'idle',
    book: null,
    chapter: null,
    checkpoint: null,
}
const checkpointSlice = createSlice({
    name: 'checkpoint',
    initialState,
    reducers: {
        addCheckpoint: (state, action) => {
            state.book = action.payload.book;
            state.chapter = action.payload.chapter;
            state.checkpoint = action.payload.checkpoint;
        },
        clearCheckpoint: (state) => {
            state.book = null;
            state.chapter = null;
            state.checkpoint = null;
        }
    },
    extraReducers(builder) {
        // show book
        builder.addCase(actShowBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actShowBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.bookInfo = action.payload;
        });
        builder.addCase(actShowBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
})

export const { addCheckpoint , clearCheckpoint} = checkpointSlice.actions;
export default checkpointSlice.reducer