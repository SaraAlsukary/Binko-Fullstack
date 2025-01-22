import { createSlice } from "@reduxjs/toolkit";
import TTheme from "@customtypes/theme";


const initialState: TTheme = { theme: "Light" }
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeThemeToDark: (state) => {
            state.theme = 'Dark';
        },
        changeThemeToLight: (state) => {
            state.theme = 'Light';
        }
    }
})

export const { changeThemeToDark, changeThemeToLight } = themeSlice.actions;
export default themeSlice.reducer;
