
import { createSlice } from "@reduxjs/toolkit";
import actGetfavorite from "./act/actGetfavorite";
import { TBooks } from "@customtypes/booksTypes";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actAddFavorite from "./act/actAddFavorite";
import actDeleteFavorite from "./act/actDeleteFavorite";
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
        actClearFavoriteBook: (state) => {
            state.books = []
        }
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
        // add Favorite
        builder.addCase(actAddFavorite.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddFavorite.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actAddFavorite.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete Favorite
        builder.addCase(actDeleteFavorite.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteFavorite.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actDeleteFavorite.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});

export const { actClearFavoriteBook } = favorite.actions
export default favorite.reducer
