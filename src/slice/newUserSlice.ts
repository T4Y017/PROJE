import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/Store";
import User from "../interfaces/user";
import axios from "axios";

export const initialNewUserState: NewUserState = {
    isNewUserModalOpen: false,
    newUserData: null,
};
export interface NewUserState {
    isNewUserModalOpen: boolean;
    newUserData: [] | null;
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
    },
});

export const addNewUser = (newUserData) => async () => {
    try {
        await axios.post("http://localhost:3000/api/users", newUserData);
    } catch (error) {}
};

export const { openNewUserModal, closeNewUserModal, setNewUser } =
    newUserSlice.actions;
