
import { createSlice } from "@reduxjs/toolkit";
import actGetBooks from "./act/actGetBooks";
import { TBooks } from "@customtypes/booksTypes";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actAddBooks from "./act/actAddBooks";
import actGetMyBooks from "./act/actGetMyBooks";
import actGetBooksToAccept from "./act/actGetBooksToAccept";
import actDeleteBook from "./act/actDeleteBooks";
import actAcceptBooks from "./act/actAcceptBook";
import actGetBooksByCategory from "./act/actGetBooksByCate";
import actDenyBooks from "./act/actDenyBook";
import actGetNotes from "./act/actGetNotes";
import actAddLikes from "./act/actAddLike";
import actGetLikes from "./act/actGetLikes";
import actDeleteLikes from "./act/actDeleteLike";
import { TLikes } from "@customtypes/LikesType";
import actGetLikeStatue from "./act/actGetLikeStatue";
import actEditBook from "./act/actEditBook";
import actGetBooksBySuperCate from "./act/actGetBooksBySuperCate";
import actGetAcceptedBooksBySuperCate from "./act/actGetAcceptedBooksBySuperCate";
import actAddRating from "./act/actAddRating";
import actTopBooks from "./act/actTopBooks";
import actRemoveDislike from "./act/actRemoveDislike";
import actAddDislike from "./act/actAddDislike";
import actMostReadingsBooks from "./act/actMostReadingsBook";
import actLatestBooks from "./act/actLatestBooks";
import actAddBookReading from "./act/actAddBookReading";
type TNote = {
    id: number,
    note: string
}
interface IBooksState {
    books: TBooks[];
    topBooks: TBooks[];
    latestBooks: TBooks[];
    mostBooks: TBooks[];
    notes: TNote | null;
    likes: TLikes | null,
    dislikes: number | 0,
    acceptedBooks: TBooks[];
    myBooks: TBooks[];
    loading: TLoading;
    is_liked: { is_liked: boolean } | null,
    error: string | null;
}

const initialState: IBooksState = {
    books: [],
    topBooks: [],
    mostBooks: [],
    latestBooks: [],
    likes: null,
    dislikes: 0,
    acceptedBooks: [],
    notes: null,
    myBooks: [],
    loading: "idle",
    error: null, is_liked: null
};

const books = createSlice({
    name: "books",
    initialState,
    reducers: {
        actClearBook: (state) => {
            state.books = [];
        }, actClearMyBook: (state) => {
            state.myBooks = [];
        },
        actClearLike: (state) => {
            state.likes = null;
        },
        actClearAcceptedBooks: (state) => {
            state.acceptedBooks = [];
        },
        actClearNotes: (state) => {
            state.notes = null;

        },
        actSetDisLike: (state, action) => {
            state.dislikes = action.payload
            console.log(action.payload)
        }
    },
    extraReducers: (builder) => {
        // get books
        builder.addCase(actGetBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.books = action.payload;
        });
        builder.addCase(actGetBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // add books
        builder.addCase(actAddBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.myBooks = action.payload;
        });
        builder.addCase(actAddBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // edit books
        builder.addCase(actEditBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actEditBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.myBooks = action.payload;
        });
        builder.addCase(actEditBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get my books
        builder.addCase(actGetMyBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetMyBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.myBooks = action.payload;
        });
        builder.addCase(actGetMyBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get Books to accept
        builder.addCase(actGetBooksToAccept.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetBooksToAccept.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.acceptedBooks = action.payload;
        });
        builder.addCase(actGetBooksToAccept.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //accept book
        builder.addCase(actAcceptBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAcceptBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.acceptedBooks = action.payload;
        });
        builder.addCase(actAcceptBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete book
        builder.addCase(actDeleteBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.books = action.payload;
        });
        builder.addCase(actDeleteBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // deny book
        builder.addCase(actDenyBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDenyBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.acceptedBooks = action.payload;
        });
        builder.addCase(actDenyBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // deny book
        builder.addCase(actGetNotes.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetNotes.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.notes = action.payload;
        });
        builder.addCase(actGetNotes.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get books by category
        builder.addCase(actGetBooksByCategory.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetBooksByCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.books = action.payload;
        });
        builder.addCase(actGetBooksByCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get books by user category
        builder.addCase(actGetBooksBySuperCate.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetBooksBySuperCate.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.books = action.payload;
        });
        builder.addCase(actGetBooksBySuperCate.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get accepted books by user category
        builder.addCase(actGetAcceptedBooksBySuperCate.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetAcceptedBooksBySuperCate.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.acceptedBooks = action.payload;
        });
        builder.addCase(actGetAcceptedBooksBySuperCate.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get Most Readings books 
        builder.addCase(actMostReadingsBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actMostReadingsBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.mostBooks = action.payload;
        });
        builder.addCase(actMostReadingsBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add reading to Books 
        builder.addCase(actAddBookReading.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddBookReading.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actAddBookReading.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get latest Books 
        builder.addCase(actLatestBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLatestBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.latestBooks = action.payload;
        });
        builder.addCase(actLatestBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get likes
        builder.addCase(actGetLikes.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetLikes.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.likes = action.payload;
        });
        builder.addCase(actGetLikes.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //add like
        builder.addCase(actAddLikes.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddLikes.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.likes!.likes_count = state.likes!.likes_count + 1;

            // state.likes.likes_count! = state.likes.likes_count! + 1;
        });
        builder.addCase(actAddLikes.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        //delete like
        builder.addCase(actDeleteLikes.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteLikes.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.likes!.likes_count = state.likes!.likes_count - 1;


        });
        builder.addCase(actDeleteLikes.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        //delete dislike
        builder.addCase(actRemoveDislike.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actRemoveDislike.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.dislikes = state.dislikes! - 1;


        });
        builder.addCase(actRemoveDislike.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //add dislike
        builder.addCase(actAddDislike.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddDislike.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.dislikes = state.dislikes! + 1;


        });
        builder.addCase(actAddDislike.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get like statue
        builder.addCase(actGetLikeStatue.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetLikeStatue.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.is_liked = action.payload;

        });
        builder.addCase(actGetLikeStatue.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //add Raitings
        builder.addCase(actAddRating.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddRating.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actAddRating.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get top 7 books
        builder.addCase(actTopBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actTopBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.topBooks = action.payload
        });
        builder.addCase(actTopBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});
export const { actClearBook, actClearMyBook, actSetDisLike, actClearLike, actClearAcceptedBooks } = books.actions
export default books.reducer
