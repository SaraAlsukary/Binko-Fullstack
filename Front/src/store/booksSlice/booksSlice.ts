
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
import actGetRecommendations from "./act/actGetRecommendations";
import actShowBook from "./act/actShowBook";
import actGetDislikeStatue from "./act/actGetDislikeStatue";
import actGetDisLikes from "./act/actGetDisLikes ";
import actGetRecommendationsByCategories from "./act/actGetRecommendationsByCategories";
import actGetRatingStatue from "./act/actGetRatingStatue";
import actGetArBooks from "./act/actGetArBooks";
import actGetForeignBooks from "./act/actGetForeignBooks";
import { TDislikes } from "@customtypes/DislikeType";
type TNote = {
    id: number,
    note: string
}

interface IBooksState {
    books: TBooks[];
    book: TBooks | null;
    arabicBooks: TBooks[];
    foreignBooks: TBooks[];
    topBooks: TBooks[];
    latestBooks: TBooks[];
    mostBooks: TBooks[];
    notes: TNote | null;
    likes: TLikes | null,
    dislikes: TDislikes | null,
    acceptedBooks: TBooks[];
    myBooks: TBooks[];
    recomBooks: TBooks[];
    loading: TLoading;
    is_rating: { rated: boolean, rating_value:number } | null;
    is_liked: { is_liked: boolean } | null;
    is_disliked: { dis_liked: boolean } | null;
    error: string | null;
}

const initialState: IBooksState = {
    books: [],
    foreignBooks: [],
    arabicBooks: [],
    book: null,
    topBooks: [],
    mostBooks: [],
    recomBooks: [],
    latestBooks: [],
    likes: null,
    dislikes: null,
    acceptedBooks: [],
    notes: null,
    myBooks: [],
    loading: "idle",
    error: null, is_liked: null, is_disliked: null, is_rating: null
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
        // get show
        builder.addCase(actShowBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actShowBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.book = action.payload;
        });
        builder.addCase(actShowBook.rejected, (state, action) => {
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
        builder.addCase(actAddBooks.fulfilled, (state, ) => {
            state.loading = "succeeded";
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
        builder.addCase(actEditBook.fulfilled, (state) => {
            state.loading = "succeeded";
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
        builder.addCase(actAcceptBooks.fulfilled, (state) => {
            state.loading = "succeeded";
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
        builder.addCase(actDeleteBook.fulfilled, (state) => {
            state.loading = "succeeded";
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
        builder.addCase(actDenyBooks.fulfilled, (state) => {
            state.loading = "succeeded";
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
        builder.addCase(actGetNotes.fulfilled, (state) => {
            state.loading = "succeeded";
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
        builder.addCase(actAddLikes.fulfilled, (state) => {
            state.loading = "succeeded";
            state.likes!.likes_count = state.likes!.likes_count + 1;
            state.is_liked!.is_liked = true;
            state.is_disliked!.dis_liked = false;

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
        builder.addCase(actDeleteLikes.fulfilled, (state) => {
            state.loading = "succeeded";
            state.likes!.likes_count = state.likes!.likes_count - 1;
            state.is_liked!.is_liked = false;


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
        builder.addCase(actRemoveDislike.fulfilled, (state) => {
            state.loading = "succeeded";
            state.dislikes!.dislike_count = state.dislikes!.dislike_count! - 1;
            state.is_disliked!.dis_liked = false;


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
        builder.addCase(actAddDislike.fulfilled, (state) => {
            state.loading = "succeeded";
            state.dislikes!.dislike_count = state.dislikes!.dislike_count + 1;
            state.is_disliked!.dis_liked = true;
            state.is_liked!.is_liked = false;

        });
        builder.addCase(actAddDislike.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get recommendations book by categories
        builder.addCase(actGetRecommendationsByCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetRecommendationsByCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.recomBooks = action.payload;

        });
        builder.addCase(actGetRecommendationsByCategories.rejected, (state, action) => {
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
        //get Dislike statue
        builder.addCase(actGetDislikeStatue.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetDislikeStatue.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.is_disliked = action.payload;

        });
        builder.addCase(actGetDislikeStatue.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get Dislikes
        builder.addCase(actGetDisLikes.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetDisLikes.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.dislikes = action.payload;

        });
        builder.addCase(actGetDisLikes.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        builder.addCase(actGetRatingStatue.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetRatingStatue.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.is_rating = action.payload;

        });
        builder.addCase(actGetRatingStatue.rejected, (state, action) => {
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
            state.is_rating!.rated = true;
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
        //get recommendations books
        builder.addCase(actGetRecommendations.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetRecommendations.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.recomBooks = action.payload
        });
        builder.addCase(actGetRecommendations.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get foreign books
        builder.addCase(actGetForeignBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetForeignBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.foreignBooks = action.payload
        });
        builder.addCase(actGetForeignBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get Arabic books
        builder.addCase(actGetArBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetArBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.arabicBooks = action.payload
        });
        builder.addCase(actGetArBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

    },
});
export const { actClearBook, actClearMyBook, actClearLike, actClearAcceptedBooks } = books.actions
export default books.reducer
