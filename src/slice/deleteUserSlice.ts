import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../interfaces/user";

export const initialDeleteUserState: DeleteUserState = {
    userData: null,
};

export interface DeleteUserState {
    userData: User | null;
}

export const deleteUserSlice = createSlice({
    name: "delete",
    initialState: initialDeleteUserState,
    reducers: {
        openDeleteModal: (state, action) => {
            state.userData = action.payload;
        },
        closeDeleteModal: (state) => {
            state.userData = null;
        },
    },
});

export const deleteUser =
    ({ id }: { id: number }) =>
    async () => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${id}`);
            return { payload: { type: "success" } };
        } catch (error) {
            return { payload: { type: "error" } };
        }
    };

export const { openDeleteModal, closeDeleteModal } = deleteUserSlice.actions;
