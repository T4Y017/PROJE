import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialNewFirmState: NewFirmState = {
    isNewFirmModalOpen: false,
    newFirmData: null,
};
export interface NewFirmState {
    isNewFirmModalOpen: boolean;
    newFirmData: [] | null;
}

export const newFirmSlice = createSlice({
    name: "newFirm",
    initialState: initialNewFirmState,
    reducers: {
        openFirmModal: (state) => {
            state.isNewFirmModalOpen = true;
        },
        closeFirmModal: (state) => {
            state.isNewFirmModalOpen = false;
        },
        setNewFirm: (state, action) => {
            state.newFirmData = action.payload;
        },
    },
});

export const addFirm = (newFirmData) => async () => {
    try {
        axios.post("http://localhost:3000/api/firms", newFirmData);
    } catch (error) {
        console.log(error);
    }
};

export const { openFirmModal, closeFirmModal, setNewFirm } =
    newFirmSlice.actions;
