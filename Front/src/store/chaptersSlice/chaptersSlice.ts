import { TChapters } from "@customtypes/chaptersType";
import { TLoading } from "@customtypes/loadingType";
import { createSlice } from "@reduxjs/toolkit";
import actGetChapters from "./act/actGetChapters";
import { isString } from "@customtypes/isString";
import actAddChapter from "./act/actAddChapter";
import actAcceptChapters from "./act/actAcceptChapter";
import actDenyChapters from "./act/actDenyChapter";
import actGetChaptersNotes from "./act/actGetChaptersNotes";
import actDeleteChapters from "./act/actDeleteChapter";
import actGetUnacceptedChapters from "./act/actGetUnacceptedChapter";
import actShowChapter from "./act/actShowChapter";

type TNote = {
    id: number,
    note: string
}
interface IChaptersState {
    chapters: TChapters[];
    chapter:TChapters|null;
    notes: TNote | null;
    acceptedchapters: TChapters[];
    myBooks: [];
    loading: TLoading;
    error: string | null;
}

const initialState: IChaptersState = {
    chapters: [],
    chapter:null,
    notes: null,
    acceptedchapters: [],
    myBooks: [],
    loading: "idle",
    error: null,
};
const chapters = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        actClearChapters: (state) => {
            state.chapters = []
        },
        actClearNotes: (state) => {
            state.notes = null
        }
    },
    extraReducers: (builder) => {
        // get books
        builder.addCase(actGetChapters.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetChapters.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.chapters = action.payload;
        });
        builder.addCase(actGetChapters.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get chapter
        builder.addCase(actShowChapter.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actShowChapter.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.chapter = action.payload;
        });
        builder.addCase(actShowChapter.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // get accepted books
        builder.addCase(actGetUnacceptedChapters.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetUnacceptedChapters.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.acceptedchapters = action.payload;
        });
        builder.addCase(actGetUnacceptedChapters.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // add chapter 
        builder.addCase(actAddChapter.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddChapter.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.chapters = action.payload;
        });
        builder.addCase(actAddChapter.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // Accept chapter 
        builder.addCase(actAcceptChapters.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAcceptChapters.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.chapters = action.payload; = action.payload
        });
        builder.addCase(actAcceptChapters.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete chapter
        builder.addCase(actDeleteChapters.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteChapters.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.chapters = state.chapters.filter((cate) => cate.id !== action.payload)

        });
        builder.addCase(actDeleteChapters.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // Deny chapter 
        builder.addCase(actDenyChapters.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDenyChapters.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.chapters = action.payload;
        });
        builder.addCase(actDenyChapters.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get notes for chapters
        builder.addCase(actGetChaptersNotes.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetChaptersNotes.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.notes = action.payload;
        });
        builder.addCase(actGetChaptersNotes.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    }

})
export const { actClearChapters } = chapters.actions;
export default chapters.reducer