import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/Store";
import User from "../interfaces/user";
import { AsyncTaskStatus } from "../state/utils";

export interface FetchUserArgs {
    page?: number;
    limit?: number;
    firmidfilter?: number;
    usernamefilter?: string;
}

const initialUserState: UserState = {
    loadUserTaskStatus: null,
    user: null,
    allUsers: [],
};
export interface UserState {
    loadUserTaskStatus: AsyncTaskStatus | null;
    user: {
        totalPage: number;
        totalUser: number;
        users: User[];
    } | null;
    allUsers: User[];
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setLoadUserTaskStatus: (state, action) => {
            state.loadUserTaskStatus = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
    },
});

// export const fetchAllUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         const res = await fetch("http://localhost:3000/api/users");
//         const data = await res.json();
//         dispatch(setAllUsers(data.users)); // sadece users dizisini ata
//         console.log("Tüm kullanıcılar alındı:", data.users);
//         return data.users;
//     } catch (error) {
//         // Hata yönetimi ekleyebilirsin
//         console.error("Tüm kullanıcılar alınamadı:", error);
//     }
// };

export const fetchUserData =
    ({ page, limit, firmidfilter, usernamefilter }: FetchUserArgs) =>
    async (dispatch: AppDispatch) => {
        const url = new URL("http://localhost:3000/api/users");

        if (page) url.searchParams.append("page", page.toString());
        if (limit) url.searchParams.append("limit", limit.toString());

        if (firmidfilter)
            url.searchParams.append("firmidfilter", firmidfilter.toString());
        if (usernamefilter)
            url.searchParams.append("usernamefilter", usernamefilter);
        dispatch(setLoadUserTaskStatus({ type: "loading" }));
        try {
            const res = await fetch(url.toString());
            const data = await res.json();
            dispatch(setUser(data));
            dispatch(setLoadUserTaskStatus({ type: "success" }));
            return data;
        } catch (error) {
            dispatch(
                setLoadUserTaskStatus({ type: "error", message: error.message })
            );
        }
    };

export const { setLoadUserTaskStatus, setUser, setAllUsers } =
    userSlice.actions;
