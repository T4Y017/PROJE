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
    const { isNewUserModalOpen } = useSelector(
        (state: AppState) => state.newUser
    );
    const handleNewUserModal = () => {
        dispatch(fetchFirmData({}));
        dispatch(openNewUserModal());
    };
    useEffect(() => {
        dispatch(
            fetchUserData({
                page,
                limit: userPerPage,
                firmidfilter: query ? Number(query) : undefined,
            })
        );
    }, [page, query]);

    const paginate = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber);
        navigate(`?${params}`);
    };
    console.log(data);
    return (
        <div className="App">
            <div className="btn-place">
                <button
                    className="btn"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Geri
                </button>
                <button className="btn" onClick={() => navigate("/")}>
                    Ana Sayfa
                </button>
            </div>
            {loadUserTaskStatus?.type === "loading" ? (
                <Spinner />
            ) : loadUserTaskStatus?.type === "success" ? (
                <>
                    <button className="btn" onClick={handleNewUserModal}>
                        <span>
                            <p>Yeni Kullanıcı Ekle</p>
                            <PersonAddIcon />
                        </span>
                    </button>
                    {isNewUserModalOpen && <NewUserModal />}
                    <UserInfoTable emp={data?.users || []} />
                    {data && data.totalPage > 1 && (
                        <Pagination
                            infoPerPage={userPerPage}
                            totalData={data.totalUser}
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
    );
};

export default Users;
