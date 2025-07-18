import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncTaskStatus } from "../state/utils";
import { AppDispatch } from "../store/Store";

export const initialNewFirmState: NewFirmState = {
    isNewFirmModalOpen: false,
    newFirmData: null,
    isFirmAdded: null,
};
export interface NewFirmState {
    isNewFirmModalOpen: boolean;
    newFirmData: [] | null;
    isFirmAdded: AsyncTaskStatus | null;
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
        setIsFirmAdded: (state, action) => {
            state.isFirmAdded = action.payload;
        },
        resetIsFirmAdded: (state) => {
            state.isFirmAdded = null;
        },
    },
});

export const addFirm = (newFirmData) => async (dispatch: AppDispatch) => {
    try {
        axios.post(
            "https://expressjs-production-88cc.up.railway.app/api/firms",
            newFirmData
        );
        dispatch(setIsFirmAdded({ type: "success" }));
        return { payload: { type: "success" } }; // <-- return eklendi
    } catch (error) {
        dispatch(setIsFirmAdded({ type: "error" }));
        return { payload: { type: "error" } }; // <-- return eklendi
        console.log(error);
    }
};

export const {
    openFirmModal,
    closeFirmModal,
    setNewFirm,
    setIsFirmAdded,
    resetIsFirmAdded,
} = newFirmSlice.actions;
