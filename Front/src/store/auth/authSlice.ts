import { createSlice } from "@reduxjs/toolkit";
import actCreateAccount from './act/actCreateAccount';
import { TLoading } from "@customtypes/loadingType";
import actLogin from "./act/actLogin";
import { isString } from "@customtypes/isString";
import actLogout from "./act/actLogout";
import actUpdateProfile from "./act/actUpdateProfile";
import actAddProfile from "./act/actAddProfile";

interface IAuthState {
    userData:
    {

        user: {
            id: number,
            is_supervisor: boolean,
            is_admin: boolean,
            username: string,
            name: string,
            image: string,
            discriptions: string,
            category?: number
        }
        message: string,
        token: string,
    } | null;
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    userData: null,
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
            state.userData = action.payload;

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
            state.userData = action.payload;
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
            // state.user = action.payload;  
        });
        builder.addCase(actLogout.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //Add Profile
        builder.addCase(actAddProfile.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddProfile.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.user = action.payload;
        });
        builder.addCase(actAddProfile.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //update profile
        builder.addCase(actUpdateProfile.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actUpdateProfile.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.user = action.payload;
        });
        builder.addCase(actUpdateProfile.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
})

export { actCreateAccount, actLogin, actLogout, actUpdateProfile };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer