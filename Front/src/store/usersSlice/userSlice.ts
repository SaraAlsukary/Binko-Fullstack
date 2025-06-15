import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetUsers from "./act/actGetUsers";
import { TUser } from "@customtypes/userType";
import actDeleteUser from "./act/actDeleteUser";
interface IBooksState {
    users: TUser[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    users: [],
    loading: "idle",
    error: null,
};

const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        actClearUsers: (state) => {
            state.users = []
        }
    },
    extraReducers: (builder) => {
        // get users
        builder.addCase(actGetUsers.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetUsers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.users = action.payload;
        });
        builder.addCase(actGetUsers.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete users
        builder.addCase(actDeleteUser.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteUser.fulfilled, (state,action) => {
            state.loading = "succeeded";
            state.users = state.users.filter((cate) => cate.id !== action.payload);

            
        });
        builder.addCase(actDeleteUser.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});

export const { actClearUsers } = users.actions
export default users.reducer
