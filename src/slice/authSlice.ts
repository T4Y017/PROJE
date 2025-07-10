import { createSlice } from "@reduxjs/toolkit";
import User from "../interfaces/user";

export const initialAuthState = {
    isAuthenticated: false,
    mail: "",
    password: "",
    role: "",
    authReady: false,
};

export interface AuthState {
    isAuthenticated: boolean;
    mail: string;
    password: string;
    role: string;
    authReady: boolean;
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.mail = action.payload.user;
            state.password = action.payload.password;
            state.role = action.payload.role; // Kullanıcı rolünü de ekle
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
