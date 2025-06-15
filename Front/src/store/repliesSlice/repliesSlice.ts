import { createSlice } from "@reduxjs/toolkit";
// import bookImage from '@assets/imgs/books/olivertwist.jfif'
import actGetCommentByBook from "./act/actGetReplyByComment";
import { TComment } from "@customtypes/commentType";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetReplyByComment from "./act/actGetReplyByComment";
import actAddReply from "./act/actAddReply";
import actDeleteReply from "./act/actDeleteReply";
// import actDeleteComment from "./act/actDeleteComment";
// import actGetComments from "./act/actGetComments";

// const initialState = [, {
//     id: 3,
//     commenterName: 'Commenter Name',
//     img: bookImage,
//     reply: [],
//     text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
// }, {
//         id: 4,
//         commenterName: 'Commenter Name',
//         reply: [],
//         img: bookImage,
//         text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//     }, {
//         id: 2,
//         commenterName: 'Commenter Name',
//         img: bookImage,
//         reply: [{
//             id: 20,
//             commenterName: 'Commenter Name',
//             img: bookImage,
//             text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//         }, {
//             id: 29,
//             commenterName: 'Commenter Name',
//             img: bookImage,
//             text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//         }],
//         text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//     }, {
//         id: 5,
//         commenterName: 'Commenter Name',
//         reply: [],
//         img: bookImage,
//         text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//     }, {
//         id: 6,
//         commenterName: 'Commenter Name',
//         reply: [],
//         img: bookImage,
//         text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//     }, {
//         id: 10,
//         commenterName: 'Commenter Name',
//         img: bookImage,
//         reply: [{
//             id: 8,
//             commenterName: 'Commenter Name',
//             img: bookImage,
//             text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//         }, {
//             id: 9,
//             commenterName: 'Commenter Name',
//             img: bookImage,
//             text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//         }],
//         text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
//     }];
interface IBooksState {
    replies: TComment[];
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
        // //Get all comments
        // builder.addCase(actGetComments.pending, (state) => {
        //     state.loading = "pending";
        //     state.error = null;
        // });
        // builder.addCase(actGetComments.fulfilled, (state, action) => {
        //     state.loading = "succeeded";
        //     state.comments = action.payload


        // });
        // builder.addCase(actGetComments.rejected, (state, action) => {
        //     state.loading = "failed";
        //     if (isString(action.payload)) {
        //         state.error = action.payload;
        //     }
        // });
    },

})
export const { actClearReplies } = replies.actions
export default replies.reducer