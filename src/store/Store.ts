import { configureStore } from "@reduxjs/toolkit";
import { userSlice, UserState } from "../slice/userSlice";
import { firmDetailSlice, FirmDetailState } from "../slice/firmDetailSlice";
import { firmSlice, FirmState } from "../slice/firmSlice";
import { userDetailSlice, UserDetailState } from "../slice/userDetailSlice";
import { newUserSlice, NewUserState } from "../slice/newUserSlice";
import { newFirmSlice, NewFirmState } from "../slice/newFirmSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        firm: firmSlice.reducer,
        firmDetails: firmDetailSlice.reducer,
        userDetails: userDetailSlice.reducer,
        newUser: newUserSlice.reducer,
        newFirm: newFirmSlice.reducer,
    },
});

export interface AppState {
    user: UserState;
    firm: FirmState;
    firmDetails: FirmDetailState;
    userDetails: UserDetailState;
    newUser: NewUserState;
    newFirm: NewFirmState;
}

export default store;
export type AppDispatch = typeof store.dispatch;
