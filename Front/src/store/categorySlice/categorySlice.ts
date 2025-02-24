import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetCategories from "./act/actGetCategories";
import { TCategory } from "@customtypes/categoryType";
interface IBooksState {
    categories: TCategory[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    categories: [],
    loading: "idle",
    error: null,
};

const categories = createSlice({
    name: "categories",
    initialState,
    reducers: {
        actClearCategories: (state) => {
            state.categories = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.categories = action.payload;
        });
        builder.addCase(actGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});
export const { actClearCategories } = categories.actions
export default categories.reducer
