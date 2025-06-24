import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
    userSlice,
    setLoadUserTaskStatus,
    UserState,
} from "../slice/userSlice";
import { firmDetailSlice, FirmDetailState } from "../slice/firmDetailSlice";
import { firmSlice, FirmState } from "../slice/firmSlice";
import { userDetailSlice, UserDetailState } from "../slice/userDetailSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        firm: firmSlice.reducer,
        firmDetails: firmDetailSlice.reducer,
        userDetails: userDetailSlice.reducer,
    },
});

export interface AppState {
    user: UserState;
    firm: FirmState;
    firmDetails: FirmDetailState;
    userDetails: UserDetailState;
}

export default store;
export type AppDispatch = typeof store.dispatch;
