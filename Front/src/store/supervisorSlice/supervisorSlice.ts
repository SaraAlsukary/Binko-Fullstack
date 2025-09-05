import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetSupervisor from "./act/actGetSupervisor";
import { TUser } from "@customtypes/userType";
import actDeleteSupervisor from "./act/actDeleteSupervisor";
import actAddSupervisor from "./act/actAddSupervisor";
import actUpdateSupervisor from "./act/actUpdateSupervisor";
interface IBooksState {
    supervisors: TUser[];
    loading: TLoading;
    error: string | null;
}

const initialState: IBooksState = {
    supervisors: [],
    loading: "idle",
    error: null,
};

const supervisors = createSlice({
    name: "supervisors",
    initialState,
    reducers: {
        actClearSupervisors: (state) => {
            state.supervisors = []
        }
    },
    extraReducers: (builder) => {
        // get supervisors
        builder.addCase(actGetSupervisor.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetSupervisor.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.supervisors = action.payload;
        });
        builder.addCase(actGetSupervisor.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add supervisor
        builder.addCase(actAddSupervisor.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddSupervisor.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.supervisors.push(action.payload);
        });
        builder.addCase(actAddSupervisor.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // update Supervisor
        builder.addCase(actUpdateSupervisor.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actUpdateSupervisor.fulfilled, (state,action) => {
            state.loading = "succeeded";
            state.supervisors = state.supervisors.map(st => st.id === action.payload.id ? action.payload : st)


        });
        builder.addCase(actUpdateSupervisor.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // delete supervisor
        builder.addCase(actDeleteSupervisor.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteSupervisor.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.supervisors = state.supervisors.filter((s) => s.id !== action.payload);

        });
        builder.addCase(actDeleteSupervisor.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
});

export const { actClearSupervisors } = supervisors.actions
export default supervisors.reducer
