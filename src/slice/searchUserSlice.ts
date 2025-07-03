import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/Store";

export const initialSearchState: SearchState = {
    searchQuery: "",
};

export interface SearchState {
    searchQuery: string;
}

export const searchUserSlice = createSlice({
    name: "search",
    initialState: initialSearchState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearSearchQuery: (state) => {
            state.searchQuery = "";
        },
    },
});

export const search =
    ({ username }) =>
    async (dispatch: AppDispatch) => {
        const url = new URL("http://localhost:3000/api/users");
        if (username) url.searchParams.append("username", username);
        try {
            const res = await fetch(url.toString());
            const data = await res.json();
            dispatch(setSearchQuery(data));
            return data;
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

export const { setSearchQuery, clearSearchQuery } = searchUserSlice.actions;
