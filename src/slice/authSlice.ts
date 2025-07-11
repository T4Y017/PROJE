import { createSlice } from "@reduxjs/toolkit";
import User from "../interfaces/user";

export const initialAuthState = {
    isAuthenticated: false,
    mail: "",
    password: "",
    role: "",
    permissions: {
        edit: false,
        delete: false,
        addUser: false,
    },
    authReady: false,
};

export interface AuthState {
    isAuthenticated: boolean;
    mail: string;
    password: string;
    role: string;
    permissions: {
        edit: boolean;
        delete: boolean;
        addUser: boolean;
    };
    authReady: boolean;
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.mail = action.payload.mail;
            state.password = action.payload.password;
            state.role = action.payload.role; // Kullanıcı rolünü de ekle
            state.permissions = action.payload.permissions;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.mail = "";
            state.password = "";
            state.role = "";
        },
        setAuthReady: (state, action) => {
            state.authReady = action.payload;
        },
    },
});

export const { setCredentials, logout, setAuthReady } = authSlice.actions;
