import React, { useEffect, useState } from "react";
import { UserInfoTable } from "../components/user-info-table";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import User from "../interfaces/user";
import Pagination from "../components/Pagination";

type Props = {};

const Users = (props: Props) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("firmidfilter");
    const page = searchParams.get("page") || 1;
    const navigate = useNavigate();
    const [employee, setUser] = useState<User[]>([]);
    const userPerPage = 2;
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const getUserInfo = () => {
        axios
            .get("http://localhost:3000/api/users", {
                params: {
                    page,
                    limit: userPerPage,
                    firmidfilter: query,
                },
            })
            .then((resp) => {
                console.log(resp);
                setTotalUser(resp.data.totalUser);
                setTotalPage(resp.data.totalPage);
                setUser(resp.data.users);
            });
    };

    const paginate = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber);
        navigate(`?${params}`);
    };

    useEffect(() => {
        getUserInfo();
    }, [page]);

    return (
        <div className="App">
            <div className="btn-place">
                <button
                    className="btn"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Geri
                </button>
            </div>
            <UserInfoTable emp={employee} />
            {totalPage > 1 && (
                <Pagination
                    infoPerPage={userPerPage}
                    totalData={totalUser}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

export default Users;
