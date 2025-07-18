import { createSlice } from "@reduxjs/toolkit";
import { AsyncTaskStatus } from "../state/utils";
import { AppDispatch } from "../store/Store";

export interface FetchFirmDetailArg {
    firmId?: number;
}
const initialFirmDetailState: FirmDetailState = {
    firmDetailTaskStatus: null,
    detail: {
        id: 0,
        firmName: "",
        firmMail: "",
        address: "",
        tel: "",
        current_working_person: 0,
        firmType: "",
        firmStatus: "",
        latitude: 0,
        longitude: 0,
    },
};

export interface FirmDetailState {
    firmDetailTaskStatus: AsyncTaskStatus | null;
    detail: {
        id: number;
        firmName: string;
        firmMail: string;
        address: string;
        tel: string;
        current_working_person: number;
        firmType: string;
        firmStatus: string;
        latitude: number;
        longitude: number;
    };
}
export const firmDetailSlice = createSlice({
    name: "firmDetail",
    initialState: initialFirmDetailState,
    reducers: {
        setFirmDetailStatus: (state, action) => {
            state.detail = action.payload;
        },
        setFirmTaskStatus: (state, action) => {
            state.firmDetailTaskStatus = action.payload;
        },
    },
});

export const fetchFirmDetailData =
    ({ firmId }: FetchFirmDetailArg) =>
    async (dispatch: AppDispatch) => {
        dispatch(setFirmTaskStatus({ type: "loading" }));
        const url = new URL(
            "https://expressjs-production-88cc.up.railway.app/api/firms/" +
                firmId
        );
        try {
            const res = await fetch(url.toString());
            const data = await res.json();

            dispatch(setFirmDetailStatus(data));
            dispatch(
                setFirmTaskStatus({
                    type: "success",
                })
            );
        } catch (error) {
            dispatch(
                setFirmTaskStatus({
                    type: "error",
                    message: error.message,
                })
            );
            console.error("Hata", error);
        }
    };

export const { setFirmDetailStatus, setFirmTaskStatus } =
    firmDetailSlice.actions;
