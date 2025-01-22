import { createSlice } from "@reduxjs/toolkit";

type TBook = {
    books: Object[]
}
const initialState: TBook = {
    books: [

    ]
}
const addBookSlice = createSlice({
    name: 'addBook',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        }
        , removeBook: (state, action) => {
            state.books = state.books.filter(book => book !== action.payload);

        }
    }

})
export const { addBook, removeBook } = addBookSlice.actions;
export default addBookSlice.reducer