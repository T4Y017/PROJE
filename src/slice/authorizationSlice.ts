import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialAuthorizationState: AuthorizationState = {
    isAuthorizationModalOpen: false,
    selectedUser: {
        userId: null,
    },
    permissions: {
        edit: false,
        delete: false,
        addUser: false,
    },
};
export interface AuthorizationState {
    isAuthorizationModalOpen: boolean;
    selectedUser: {
        userId: number | null;
    };
    permissions: {
        edit: boolean;
        delete: boolean;
        addUser: boolean;
    };
}

export const authorizationSlice = createSlice({
    name: "authorization",
    initialState: initialAuthorizationState,
    reducers: {
        openAuthorizationModal: (state, action) => {
            state.isAuthorizationModalOpen = true;
            state.selectedUser.userId = action.payload;
            state.permissions = action.payload;
        },
        closeAuthorizationModal: (state) => {
            state.isAuthorizationModalOpen = false;
            state.selectedUser.userId = null;
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
    },
});

export const giveAuthorization =
    ({ userId, permissions }: { userId: number; permissions }) =>
    async () => {
        try {
            await axios.post(`http://localhost:3000/api/users/${userId}`, {
                permissions,
            });
            return { payload: { type: "success" } };
        } catch (error) {
            return { payload: { type: "error" } };
        }
    };

export const {
    openAuthorizationModal,
    closeAuthorizationModal,
    setPermissions,
} = authorizationSlice.actions;
