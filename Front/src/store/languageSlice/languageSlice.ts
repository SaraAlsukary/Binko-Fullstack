import { createSlice } from "@reduxjs/toolkit";
import TLanguage from "@customtypes/languge";

const initialState: TLanguage = { language: "English" }
const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguageToEnglish: (state) => {
            state.language = "English";
        },
        changeLanguageToArabic: (state) => {
            state.language = "Arabic";
        }
    }
})

export const { changeLanguageToEnglish, changeLanguageToArabic } = languageSlice.actions;
export default languageSlice.reducer;
