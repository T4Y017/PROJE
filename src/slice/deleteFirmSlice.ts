import { createSlice } from "@reduxjs/toolkit";
import Firm from "../interfaces/Firm";
import axios from "axios";

export const initialDeleteFirmState: DeleteFirmState = {
    isDeleteFirmModalOpen: false,
    firmData: null,
};

export interface DeleteFirmState {
    isDeleteFirmModalOpen: boolean;
    firmData: Firm | null;
}

export const deleteFirmSlice = createSlice({
    name: "deleteFirm",
    initialState: initialDeleteFirmState,
    reducers: {
        openDeleteFirmModal: (state, action) => {
            state.firmData = action.payload;
        },
        closeDeleteFirmModal: (state) => {
            state.firmData = null;
        },
    },
});

export const deleteFirm =
    ({ firmId }: { firmId: number }) =>
    async () => {
        try {
            await axios.delete(
                `http://expressjs-production-88cc.up.railway.app/api/firms/${firmId}`
            );
            return { payload: { type: "success" } };
        } catch (error) {
            return { payload: { type: "error" } };
        }
    };
export const { openDeleteFirmModal, closeDeleteFirmModal } =
    deleteFirmSlice.actions;
