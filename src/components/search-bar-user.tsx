import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./search-bar.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { search, setSearchQuery } from "../slice/searchUserSlice";
type Props = {};

export const SearchBarUser = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const search = useSelector(
        (state: AppState) => state.searchUser.searchQuery
    );
    return (
        <div className="input-wrapper">
            <input
                type="text"
                placeholder="Kullanıcı Ara..."
                className="search-input"
                value={search}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            <SearchIcon />
        </div>
    );
};
