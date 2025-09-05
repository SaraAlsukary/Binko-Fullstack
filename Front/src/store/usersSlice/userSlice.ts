import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetUsers from "./act/actGetUsers";
import { TUser } from "@customtypes/userType";
import actDeleteUser from "./act/actDeleteUser";
import actGetAcceptedUsers from "./act/actGetAcceptedUsers";
import actGetUnacceptedUsers from "./act/actGetUnacceptedUsers";
import actGetReaders from "./act/actGetReaders";
import actGetWriters from "./act/actGetWriters";
import actAcceptUser from "./act/actAcceptUser";
import actDenyUser from "./act/actDenyUser";
interface IBooksState {
    users: TUser[];
    acceptedUsers: TUser[];
    unacceptedUsers: TUser[];
    writers: TUser[];
    readers: TUser[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    users: [],
    acceptedUsers: [],
    unacceptedUsers: [],
    writers: [],
    readers: [],
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
        builder.addCase(actDeleteUser.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.users = state.users.filter((cate) => cate.id !== action.payload);


        });
        builder.addCase(actDeleteUser.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get accepted users
        builder.addCase(actGetAcceptedUsers.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetAcceptedUsers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.acceptedUsers = action.payload;
        });
        builder.addCase(actGetAcceptedUsers.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }

        });
        // get Unaccepted users
        builder.addCase(actGetUnacceptedUsers.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetUnacceptedUsers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.unacceptedUsers = action.payload;
        });
        builder.addCase(actGetUnacceptedUsers.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get Readers 
        builder.addCase(actGetReaders.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetReaders.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.readers = action.payload;
        });
        builder.addCase(actGetReaders.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // get writers 
        builder.addCase(actGetWriters.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetWriters.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.writers = action.payload;
        });
        builder.addCase(actGetWriters.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // accept user 
        builder.addCase(actAcceptUser.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAcceptUser.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actAcceptUser.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // deny user 
        builder.addCase(actDenyUser.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDenyUser.fulfilled, (state) => {
            state.loading = "succeeded";

        });
        builder.addCase(actDenyUser.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});

export const { actClearUsers } = users.actions
export default users.reducer
