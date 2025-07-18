import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Firm from "../interfaces/Firm";
import { AsyncTaskStatus } from "../state/utils";
import { AppDispatch } from "../store/Store";

export const initialEditState: EditFirmState = {
    firmData: null,
    isEdited: null,
};

export interface EditFirmState {
    firmData: Firm | null;
    isEdited: AsyncTaskStatus | null;
}

export const editFirmSlice = createSlice({
    name: "edit",
    initialState: initialEditState,
    reducers: {
        openEditModal: (state, action) => {
            state.firmData = action.payload;
        },
        closeEditModal: (state) => {
            state.firmData = null;
        },
        editFirmName: (state, action) => {
            state.firmData = action.payload;
        },
        setEditStatus: (state, action) => {
            state.isEdited = action.payload;
        },
        resetEdited: (state) => {
            state.isEdited = null;
        },
    },
});

export const editFirm =
    ({ id, firmData }: { id: number; firmData: Partial<Firm> }) =>
    async (dispatch: AppDispatch) => {
        try {
            await axios.put(
                `http://expressjs-production-88cc.up.railway.app/api/firms/${id}`,
                firmData
            );
            dispatch(setEditStatus({ type: "success" }));
        } catch (error) {
            dispatch(setEditStatus({ type: "error" }));
            console.log(error);
        }
    };

export const {
    openEditModal,
    closeEditModal,
    editFirmName,
    setEditStatus,
    resetEdited,
} = editFirmSlice.actions;
