import React, { useEffect } from "react";
import { UserInfoTable } from "../components/user-info-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { fetchUserData } from "../slice/userSlice";
import Spinner from "../components/spinner";

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
    useEffect(() => {
        dispatch(
            fetchUserData({
                page,
                limit: userPerPage,
                firmidfilter: query ? Number(query) : undefined,
            })
        );
    }, [page]);

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
            </div>
            {loadUserTaskStatus?.type === "loading" ? (
                <Spinner />
            ) : loadUserTaskStatus?.type === "success" ? (
                <>
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
