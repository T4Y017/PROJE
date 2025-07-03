import React, { use } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./search-bar.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { setSearchQuery } from "../slice/searchUserSlice";
type Props = {};

export const SearchBarFirm = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="input-wrapper">
            <input
                type="text"
                placeholder="Firma Ara..."
                className="search-input"
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            <SearchIcon />
        </div>
    );
};
