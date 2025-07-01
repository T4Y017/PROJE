import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../interfaces/user";
import { AsyncTaskStatus } from "../state/utils";
import { AppDispatch } from "../store/Store";

export const initialEditState: EditUserState = {
    userData: null,
    isEdited: null,
};

export interface EditUserState {
    userData: User | null;
    isEdited: AsyncTaskStatus | null;
}

export const editUserSlice = createSlice({
    name: "edit",
    initialState: initialEditState,
    reducers: {
        openEditModal: (state, action) => {
            state.userData = action.payload;
        },
        closeEditModal: (state) => {
            state.userData = null;
        },
        editUserName: (state, action) => {
            state.userData = action.payload;
        },
        setEditStatus: (state, action) => {
            state.isEdited = action.payload;
        },
        resetEdited: (state) => {
            state.isEdited = null;
        },
    },
});

export const editUser =
    ({ id, userData }: { id: number; userData: Partial<User> }) =>
    async (dispatch: AppDispatch) => {
        try {
            await axios.put(`http://localhost:3000/api/users/${id}`, userData);
            dispatch(setEditStatus({ type: "success" }));
        } catch (error) {
            dispatch(setEditStatus({ type: "error" }));
            console.log(error);
        }
    };

export const {
    openEditModal,
    closeEditModal,
    editUserName,
    setEditStatus,
    resetEdited,
} = editUserSlice.actions;
