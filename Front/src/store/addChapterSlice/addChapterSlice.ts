import { createSlice } from "@reduxjs/toolkit";

type TChapter = {
    chapters: Object[]
}
const initialState: TChapter = {
    chapters: [
        {
            file: '',
            title: '',
            value: ''
        }
    ]
}
const addChapterSlice = createSlice({
    name: 'addChapter',
    initialState,
    reducers: {
        addChapter: (state, action) => {
            state.chapters.push(action.payload);
        }, removeChapter: (state, action) => {
            state.chapters = state.chapters.filter(book => book !== action.payload);

        }
    }
})
export const { addChapter, removeChapter } = addChapterSlice.actions;
export default addChapterSlice.reducer