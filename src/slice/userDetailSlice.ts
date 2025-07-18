import { createSlice } from "@reduxjs/toolkit";
import { AsyncTaskStatus } from "../state/utils";
import { AppDispatch } from "../store/Store";

export interface FetchUserDetailArg {
    userId: number;
}

const initialUserDetailState: UserDetailState = {
    userDetailTaskStatus: null,
    detail: {
        id: 0,
        username: "",
        surname: "",
        mail: "",
        tel: "",
        firmName: "",
        firmId: 0,
        status: "",
        role: "",
        birthdate: "",
        gender: "",
        known_language: "",
    },
};

export interface UserDetailState {
    userDetailTaskStatus: AsyncTaskStatus | null;
    detail: {
        id: number;
        username: string;
        surname: string;
        mail: string;
        tel: string;
        firmName: string;
        firmId: number;
        status: string;
        role: string;
        birthdate: string;
        gender: string;
        known_language: string;
    };
}

export const userDetailSlice = createSlice({
    name: "userDetail",
    initialState: initialUserDetailState,
    reducers: {
        setUserDetailStatus: (state, action) => {
            state.detail = action.payload;
        },
        setUserTaskStatus: (state, action) => {
            state.userDetailTaskStatus = action.payload;
        },
    },
});

export const fetchUserDetailData =
    ({ userId }: FetchUserDetailArg) =>
    async (dispatch: AppDispatch) => {
        dispatch(setUserTaskStatus({ type: "loading" }));
        const url = new URL(
            "http://expressjs-production-88cc.up.railway.app/api/users/" +
                userId
        );
        try {
            const res = await fetch(url.toString());
            const data = await res.json();

            dispatch(setUserDetailStatus(data));
            dispatch(
                setUserTaskStatus({
                    type: "success",
                })
            );
        } catch (error) {
            dispatch(
                setUserTaskStatus({
                    type: "error",
                    message: error.message,
                })
            );
        }
    };

export const { setUserDetailStatus, setUserTaskStatus } =
    userDetailSlice.actions;
