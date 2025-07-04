import { createSlice } from "@reduxjs/toolkit";
import User from "../interfaces/user";

export const initialAuthState = {
    isAuthenticated: false,
    username: "",
    password: "",
    role: "",
};

export interface AuthState {
    isAuthenticated: boolean;
    username: string;
    password: string;
    role: string;
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.user;
            state.password = action.payload.password;
            state.role = action.payload.role; // Kullanıcı rolünü de ekle
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.username = "";
            state.password = "";
            state.role = "";
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
