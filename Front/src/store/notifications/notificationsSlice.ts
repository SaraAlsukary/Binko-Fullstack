
import { createSlice } from "@reduxjs/toolkit";

import { TBooks } from "@customtypes/booksTypes";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetNotificationsCounts from "./act/actGetNotificationsCounts";
import actGetNotificationsList from "./act/actGetNotificationsList";
import actReadNotifications from "./act/actReadNotificationsts";

interface IBooksState {
    notifications: TBooks[];
    notificationsCount: number;
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    notifications: [],
    notificationsCount: 0,
    loading: "idle",
    error: null,
};

const favorite = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        actClearNotifications: (state) => {
            state.notifications = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetNotificationsCounts.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetNotificationsCounts.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.notificationsCount = action.payload;
        });
        builder.addCase(actGetNotificationsCounts.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add Favorite
        builder.addCase(actGetNotificationsList.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetNotificationsList.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.notifications = action.payload;

        });
        builder.addCase(actGetNotificationsList.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete Favorite
        builder.addCase(actReadNotifications.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actReadNotifications.fulfilled, (state) => {
            state.loading = "succeeded";
            state.notificationsCount = 0;
        });
        builder.addCase(actReadNotifications.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});

export const { actClearNotifications } = favorite.actions
export default favorite.reducer
