import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
import { RootState } from "@store/index";

const actAddProfile = createAsyncThunk(
    "auth/actAddProfile",
    async (formData: FormData, thunk) => {
        const { rejectWithValue, getState } = thunk;
        const { auth } = getState() as RootState;
        try {
            const res = await axios.put(`update-user/${auth.userData?.id}/`, formData, {
            });
            return res.data;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddProfile;
