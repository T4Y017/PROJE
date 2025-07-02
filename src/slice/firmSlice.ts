import { createSlice } from "@reduxjs/toolkit";
import Firm from "../interfaces/Firm";
import { AppDispatch } from "../store/Store";
import { AsyncTaskStatus } from "../state/utils";

export interface FetchFirmArgs {
    page?: number;
    limit?: number;
}

const initialFirmState: FirmState = {
    loadFirmStatus: null,
    firm: null,
};

export interface FirmState {
    loadFirmStatus: AsyncTaskStatus | null;
    firm: {
        totalPage: number;
        totalFirm: number;
        firms: Firm[];
    } | null;
}

export const firmSlice = createSlice({
    name: "firm",
    initialState: initialFirmState,
    reducers: {
        setLoadFirmTaskStatus: (state, action) => {
            state.loadFirmStatus = action.payload;
        },
        setFirm: (state, action) => {
            state.firm = action.payload;
        },
    },
});

export const fetchFirmData =
    ({ page, limit }: FetchFirmArgs) =>
    async (dispatch: AppDispatch) => {
        const url = new URL("http://localhost:3000/api/firms");

        if (page) url.searchParams.append("page", page.toString());
        if (limit) url.searchParams.append("limit", limit.toString());
        dispatch(setLoadFirmTaskStatus({ type: "loading" }));
        try {
            const res = await fetch(url.toString());
            const data = await res.json();

            dispatch(setFirm(data));
            dispatch(setLoadFirmTaskStatus({ type: "success" }));
            return { payload: data }; // <-- return ekle
        } catch (error) {
            dispatch(
                setLoadFirmTaskStatus({ type: "error", message: error.message })
            );
        }
    };
export const { setLoadFirmTaskStatus, setFirm } = firmSlice.actions;
