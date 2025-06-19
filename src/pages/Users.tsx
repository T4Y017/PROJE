import React, { useEffect, useState } from "react";
import { UserInfoTable } from "../components/user-info-table";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import User from "../interfaces/user";

type Props = {};

const Users = (props: Props) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("firmidfilter");
    const navigate = useNavigate();
    const [employee, setUser] = useState<User[]>([]);
    const getUserInfo = () => {
        axios
            .get("http://localhost:3000/api/users", {
                params: {
                    firmidfilter: query,
                },
            })
            .then((resp) => {
                console.log(resp);

                setUser(resp.data.users);
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

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
        </div>
    );
};

export default Users;
