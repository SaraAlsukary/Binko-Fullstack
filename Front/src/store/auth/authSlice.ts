import { createSlice } from "@reduxjs/toolkit";
import actCreateAccount from './act/actCreateAccount';
import { TLoading } from "@customtypes/loadingType";
import actLogin from "./act/actLogin";
import { isString } from "@customtypes/isString";
import actLogout from "./act/actLogout";

interface IAuthState {
    user: {
        name: string,
        username: string,
        is_admin: boolean,
        is_supervisor: boolean
    } | null;
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    user: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            state.user = null;
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
            state.user = action.payload;

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
            state.user = action.payload;
        });
        builder.addCase(actLogin.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //logout
        builder.addCase(actLogout.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLogout.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.user = action.payload;
        });
        builder.addCase(actLogout.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
})

export { actCreateAccount, actLogin, actLogout };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer