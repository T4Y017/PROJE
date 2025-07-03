import { configureStore } from "@reduxjs/toolkit";
import { userSlice, UserState } from "../slice/userSlice";
import { firmDetailSlice, FirmDetailState } from "../slice/firmDetailSlice";
import { firmSlice, FirmState } from "../slice/firmSlice";
import { userDetailSlice, UserDetailState } from "../slice/userDetailSlice";
import { newUserSlice, NewUserState } from "../slice/newUserSlice";
import { newFirmSlice, NewFirmState } from "../slice/newFirmSlice";
import { editUserSlice, EditUserState } from "../slice/editUserSlice";
import { editFirmSlice, EditFirmState } from "../slice/editFirmSlice";
import { deleteUserSlice, DeleteUserState } from "../slice/deleteUserSlice";
import {
    deleteFirm,
    deleteFirmSlice,
    DeleteFirmState,
} from "../slice/deleteFirmSlice";
import { search, searchUserSlice, SearchState } from "../slice/searchUserSlice";
import { searchFirmSlice } from "../slice/searchFirmSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        firm: firmSlice.reducer,
        firmDetails: firmDetailSlice.reducer,
        userDetails: userDetailSlice.reducer,
        newUser: newUserSlice.reducer,
        newFirm: newFirmSlice.reducer,
        editUser: editUserSlice.reducer,
        editFirm: editFirmSlice.reducer,
        deleteUser: deleteUserSlice.reducer,
        deleteFirm: deleteFirmSlice.reducer,
        searchUser: searchUserSlice.reducer,
        searchFirm: searchFirmSlice.reducer,
    },
});

export interface AppState {
    user: UserState;
    firm: FirmState;
    firmDetails: FirmDetailState;
    userDetails: UserDetailState;
    newUser: NewUserState;
    newFirm: NewFirmState;
    editUser: EditUserState;
    editFirm: EditFirmState;
    deleteUser: DeleteUserState;
    deleteFirm: DeleteFirmState;
    searchUser: SearchState;
    searchFirm: SearchState;
}

export default store;
export type AppDispatch = typeof store.dispatch;
