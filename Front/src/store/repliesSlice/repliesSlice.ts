import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetReplyByComment from "./act/actGetReplyByComment";
import actAddReply from "./act/actAddReply";
import actDeleteReply from "./act/actDeleteReply";
import actAddReplyToComment from "./act/actAddReplyToComment";
import { TReplies } from "@customtypes/replyType";
import actAddReplyToReply from "./act/actAddReplyToReply";
interface IBooksState {
    replies: TReplies[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    replies: [],
    loading: "idle",
    error: null,
};
const replies = createSlice({
    name: 'replies',
    initialState,
    reducers: {
        actClearReplies: (state) => {
            state.replies = []
        }
    },
    extraReducers(builder) {
        // Get replies by comment
        builder.addCase(actGetReplyByComment.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetReplyByComment.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.replies = action.payload;
        });
        builder.addCase(actGetReplyByComment.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Add reply to a comment
        builder.addCase(actAddReplyToComment.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddReplyToComment.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.replies.push(action.payload);

        });
        builder.addCase(actAddReplyToComment.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Add reply
        builder.addCase(actAddReply.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddReply.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.replies.push(action.payload);

        });
        builder.addCase(actAddReply.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Add reply on reply
        builder.addCase(actAddReplyToReply.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddReplyToReply.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.replies.push(action.payload);

        });
        builder.addCase(actAddReplyToReply.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // //Delete reply
        builder.addCase(actDeleteReply.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteReply.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.replies = state.replies.filter((cate) => cate.id !== action.payload)
        });
        builder.addCase(actDeleteReply.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },

})
export const { actClearReplies } = replies.actions
export default replies.reducer