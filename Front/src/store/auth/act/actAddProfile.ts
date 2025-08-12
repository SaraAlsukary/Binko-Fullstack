import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
import { RootState } from "@store/index";
// type TFormData = {
//     name: string;
//     username: string;

//     // password: string;
//     // confirm_password: string;
// };
// type TResponse = {
//     name: string,
//     username: string,
//     is_admin: boolean,
//     is_supervisor: boolean
// };
type TResponse = {}
const actAddProfile = createAsyncThunk(
    "auth/actAddProfile",
    async (formData: FormData, thunk) => {
        const { rejectWithValue, getState } = thunk;
        const { auth } = getState() as RootState;

        try {
            const res = await axios.put<TResponse>(`update-user/${auth.userData!.id}/`, formData, {
                // headers: { 'Content-Type': 'application/json' },
            });
            return res.data;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actAddProfile;
