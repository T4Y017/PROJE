import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Permission } from "../interfaces/user";

export const initialAuthorizationState: AuthorizationState = {
    isAuthorizationModalOpen: false,
    selectedUser: {
        userId: null,
    },
    permissions: [],
};
export interface AuthorizationState {
    isAuthorizationModalOpen: boolean;
    selectedUser: {
        userId: number | null;
    };
    permissions: Permission[];
}

export const authorizationSlice = createSlice({
    name: "authorization",
    initialState: initialAuthorizationState,
    reducers: {
        openAuthorizationModal: (state, action) => {
            state.isAuthorizationModalOpen = true;
            state.selectedUser.userId = action.payload;
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
            await axios.post(
                `https://expressjs-production-88cc.up.railway.app/api/users/${userId}`,
                {
                    permissions,
                }
            );
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
