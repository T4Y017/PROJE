import React, { useEffect, useState } from "react";
import { UserInfoTable } from "../components/user-info-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { fetchUserData } from "../slice/userSlice";
import Spinner from "../components/spinner";
import { openNewUserModal } from "../slice/newUserSlice";
import NewUserModal from "../components/new-user-modal";
import { fetchFirmData } from "../slice/firmSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SearchBarUser } from "../components/search-bar-user";
import { filterSearch } from "../state/utils";
import { clearSearchQuery, setSearchQuery } from "../slice/searchUserSlice";
import { logout } from "../slice/authSlice";

type Props = {};

const Users = (props: Props) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("firmidfilter");
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const navigate = useNavigate();
    const userPerPage = 2;
    const loadUserTaskStatus = useSelector(
        (state: AppState) => state.user.loadUserTaskStatus
    );
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: AppState) => state.user.user);
    console.log("gelen kişi", data?.users);
    const search = useSelector(
        (state: AppState) => state.searchUser.searchQuery
    );
    const userRole = useSelector((state: AppState) => state.auth.role);
    const filteredUsers = filterSearch(data?.users || [], search);
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * userPerPage,
        page * userPerPage
    );
    const { isNewUserModalOpen } = useSelector(
        (state: AppState) => state.newUser
    );
    const handleNewUserModal = () => {
        dispatch(fetchFirmData({}));
        dispatch(openNewUserModal());
    };
    const permissions = useSelector(
        (state: AppState) => state.auth.permissions
    );
    const handleLogout = async () => {
        await fetch("http://localhost:3000/api/logout", {
            method: "POST",
            credentials: "include", // important to send cookies!
        });

        dispatch(logout()); // reset Redux auth state
        localStorage.removeItem("accessToken"); // clear token
    };

    useEffect(() => {
        console.log("Request initiated", page);

        dispatch(
            fetchUserData({
                page,
                firmidfilter: query ? Number(query) : undefined,
                usernamefilter: search,
            })
        );
    }, [page, search]);

    useEffect(() => {
        if (search) paginate(1);
    }, [search]);

    const paginate = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber);
        navigate(`?${params}`);
    };
    return (
        <div className="App">
            <div className="btn-place">
                <button
                    className="btn"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowBackIcon />
                </button>
                <button className="btn" onClick={handleLogout}>
                    <HomeIcon />
                </button>
            </div>
            <div className="container">
                <SearchBarUser />
                {loadUserTaskStatus?.type === "loading" ? (
                    <Spinner />
                ) : loadUserTaskStatus?.type === "success" ? (
                    <>
                        {(userRole === "admin" ||
                            (userRole === "gözlemci" && data?.users)) && (
                            <button
                                className="btn"
                                onClick={handleNewUserModal}
                            >
                                <span>
                                    <p>Yeni Kullanıcı Ekle</p>
                                    <PersonAddIcon />
                                </span>
                            </button>
                        )}

                        {isNewUserModalOpen && <NewUserModal />}
                        <UserInfoTable emp={data!.users} />
                        {data!.totalPage > 1 && (
                            <Pagination
                                infoPerPage={userPerPage}
                                totalData={data!.totalUser}
                                paginate={paginate}
                            />
                        )}
                    </>
                ) : (
                    <div style={{ color: "red" }}>
                        {loadUserTaskStatus?.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
