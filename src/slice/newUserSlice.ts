import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/Store";
import User from "../interfaces/user";
import axios from "axios";
import { AsyncTaskStatus } from "../state/utils";

export const initialNewUserState: NewUserState = {
    isNewUserModalOpen: false,
    newUserData: null,
    isUserAdded: null,
};
export interface NewUserState {
    isNewUserModalOpen: boolean;
    newUserData: [] | null;
    isUserAdded: AsyncTaskStatus | null;
}

export const newUserSlice = createSlice({
    name: "newUser",
    initialState: initialNewUserState,
    reducers: {
        openNewUserModal: (state) => {
            state.isNewUserModalOpen = true;
        },
        closeNewUserModal: (state) => {
            state.isNewUserModalOpen = false;
        },
        setNewUser: (state, action) => {
            state.newUserData = action.payload;
        },
        setUserAddStatus: (state, action) => {
            state.isUserAdded = action.payload;
        },
        resetIsUserAdded: (state) => {
            state.isUserAdded = null;
        },
    },
});

export const addNewUser = (newUserData) => async (dispatch: AppDispatch) => {
    try {
        await axios.post(
            "http://expressjs-production-88cc.up.railway.app/api/users",
            newUserData
        );
        dispatch(setUserAddStatus({ type: "success" }));
        return { payload: { type: "success" } }; // <-- return eklendi
    } catch (error) {
        dispatch(setUserAddStatus({ type: "error" }));
        return { payload: { type: "error" } }; // <-- return eklendi
    }
};

export const {
    openNewUserModal,
    closeNewUserModal,
    setNewUser,
    setUserAddStatus,
    resetIsUserAdded,
} = newUserSlice.actions;
