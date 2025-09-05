import { createSlice } from "@reduxjs/toolkit";
import actCreateAccount from './act/actCreateAccount';
import { TLoading } from "@customtypes/loadingType";
import actLogin from "./act/actLogin";
import actLogout from "./act/actLogout";
import actUpdateProfile from "./act/actUpdateProfile";
import actAddProfile from "./act/actAddProfile";
import { TAuth } from "@customtypes/authType";

interface IAuthState {
    userData: TAuth,
    loading: TLoading;
    error: { non_field_errors: string[] } | null;
    createdAccount: TAuth;
}
const initialState: IAuthState = {
    userData: null,
    createdAccount: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            state.userData = null;
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
            state.createdAccount = action.payload;

        });
        builder.addCase(actCreateAccount.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as { non_field_errors: string[] };
        });


        // login
        builder.addCase(actLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.userData = action.payload;
        });
        builder.addCase(actLogin.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as { non_field_errors: string[] };
        });
        //logout
        builder.addCase(actLogout.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLogout.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.user = action.payload;  
        });
        builder.addCase(actLogout.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as { non_field_errors: string[] };
        });
        //Add Profile
        builder.addCase(actAddProfile.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddProfile.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.createdAccount = action.payload;
        });
        builder.addCase(actAddProfile.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as { non_field_errors: string[] };
        });
        //update profile
        builder.addCase(actUpdateProfile.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actUpdateProfile.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.userData = action.payload;
        });
        builder.addCase(actUpdateProfile.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as { non_field_errors: string[] };
        });
    },
})

export { actCreateAccount, actLogin, actLogout, actUpdateProfile };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer