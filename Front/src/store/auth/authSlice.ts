import { createSlice } from "@reduxjs/toolkit";
import actCreateAccount from './act/actCreateAccount';
import { TLoading } from "@customtypes/loadingType";
import actLogin from "./act/actLogin";
import { isString } from "@customtypes/isString";

interface IAuthState {
    user: {
        id?: number,
        image?: string,
        name: string;
        username: string;
        password: string;
        // confirm_password: string;
    } | null;
    accessToken: string | null;
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actCreateAccount.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actCreateAccount.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload.token;

        });
        builder.addCase(actCreateAccount.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // login
        builder.addCase(actLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload.token;
            state.user = action.payload.user;
        });
        builder.addCase(actLogin.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
})

export { actCreateAccount, actLogin };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer