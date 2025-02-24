import { createSlice } from "@reduxjs/toolkit";
// import bookImage from '@assets/imgs/books/olivertwist.jfif'
import actGetCommentByBook from "./act/actGetCommentByBook";
import { TComment } from "@customtypes/commentType";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actAddComments from "./act/actAddComment";

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
        });
        builder.addCase(actAddComments.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },

})
export const { actClearComments } = comments.actions
export default comments.reducer