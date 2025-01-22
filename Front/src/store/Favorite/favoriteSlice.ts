
import { createSlice } from "@reduxjs/toolkit";
import actGetfavorite from "./act/actGetfavorite";
import { TBooks } from "@customtypes/booksTypes";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
interface IBooksState {
    books: TBooks[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    books: [],
    loading: "idle",
    error: null,
};

const favorite = createSlice({
    name: "favorite",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(actGetfavorite.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetfavorite.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.books = action.payload;
        });
        builder.addCase(actGetfavorite.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});

export default favorite.reducer
