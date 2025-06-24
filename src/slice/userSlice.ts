import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/Store";
import User from "../interfaces/user";
import { AsyncTaskStatus } from "../state/utils";

export interface FetchUserArgs {
    page?: number;
    limit?: number;
    firmidfilter?: number;
}

const initialUserState: UserState = {
    loadUserTaskStatus: null,
    user: null,
};
export interface UserState {
    loadUserTaskStatus: AsyncTaskStatus | null;
    user: {
        totalPage: number;
        totalUser: number;
        users: User[];
    } | null;
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
    },
});

export const fetchUserData =
    ({ page, limit, firmidfilter }: FetchUserArgs) =>
    async (dispatch: AppDispatch) => {
        const url = new URL("http://localhost:3000/api/users");

        if (page) url.searchParams.append("page", page.toString());
        if (limit) url.searchParams.append("limit", limit.toString());
        if (firmidfilter)
            url.searchParams.append("firmidfilter", firmidfilter.toString());
        dispatch(setLoadUserTaskStatus({ type: "loading" }));
        try {
            const res = await fetch(url.toString());
            const data = await res.json();
            dispatch(setUser(data));
            dispatch(setLoadUserTaskStatus({ type: "success" }));
        } catch (error) {
            dispatch(
                setLoadUserTaskStatus({ type: "error", message: error.message })
            );
        }
    };

export const { setLoadUserTaskStatus, setUser } = userSlice.actions;
