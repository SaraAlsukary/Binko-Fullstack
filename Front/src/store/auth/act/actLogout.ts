import { createAsyncThunk, GetState } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "@store/index";

type TFormData = {
    username: string;
    password: string;
};

type TResponse = object;

const actLogout = createAsyncThunk(
    "auth/actLogout",
    async (_, thunk) => {
        const { rejectWithValue, getState } = thunk;
        const auth = getState() as RootState;

        try {
            const res = await axios.post<TResponse>("logout", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + auth.auth.user.token,

                },
            }
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLogout;
