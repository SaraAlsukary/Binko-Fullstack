import { createSlice } from "@reduxjs/toolkit";
// import bookImage from '@assets/imgs/books/olivertwist.jfif'
import actGetCommentByBook from "./act/actGetCommentByBook";
import { TComment } from "@customtypes/commentType";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actAddComments from "./act/actAddComment";
import actDeleteComment from "./act/actDeleteComment";
import actGetComments from "./act/actGetComments";


interface IBooksState {
    comments: TComment[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    comments: [],
    loading: "idle",
    error: null,
};
const comments = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        actClearComments: (state) => {
            state.comments = []
        },
        changeReplyCount: (state,action) => {
            const findIndex = state.comments.findIndex(comment => comment.id === action.payload)
            state.comments[findIndex].reply_count++;
        }
    },
    extraReducers(builder) {
        // Get Comments by Books
        builder.addCase(actGetCommentByBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCommentByBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.comments = action.payload;
        });
        builder.addCase(actGetCommentByBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Add comment
        builder.addCase(actAddComments.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddComments.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.comments.push(action.payload);

        });
        builder.addCase(actAddComments.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Delete comment
        builder.addCase(actDeleteComment.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteComment.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.comments = state.comments.filter((cate) => cate.id !== action.payload)


        });
        builder.addCase(actDeleteComment.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Get all comments
        builder.addCase(actGetComments.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetComments.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.comments = action.payload


        });
        builder.addCase(actGetComments.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },

})
export const { actClearComments,changeReplyCount } = comments.actions
export default comments.reducer