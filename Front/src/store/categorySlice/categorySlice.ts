import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetCategories from "./act/actGetCategories";
import { TCategory } from "@customtypes/categoryType";
import actAddCategory from "./act/actAddCategory";
import actUpdateCategory from "./act/actUpdateCategory";
import actDeleteCategory from "./act/actDeleteCategory";
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
        // get
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
        // add
        builder.addCase(actAddCategory.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.categories.push(action.payload);

            // state.categories = action.payload;
        });
        builder.addCase(actAddCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update
        builder.addCase(actUpdateCategory.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actUpdateCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.categories = state.categories.filter((cate) => cate.id !== action.payload)

            state.categories.push(action.payload)
        })
        // state.categories = action.payload;
        builder.addCase(actUpdateCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete
        builder.addCase(actDeleteCategory.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.categories = state.categories.filter((cate) => cate.id !== action.payload)

            // state.categories = action.payload;
        });
        builder.addCase(actDeleteCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    }
});
export const { actClearCategories } = categories.actions
export default categories.reducer
