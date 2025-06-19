import React, { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import axios from "axios";
import User from "../interfaces/user";
import "./info-modal.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
interface Props {
    userId: number;
}

const UserDetail = ({ userId }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<User>({
        id: 0,
        username: "none",
        surname: "none",
        mail: "none",
        tel: "none",
        firmName: "none",
        firmId: 0,
        status: "none",
        role: "none",
        birthdate: "none",
        gender: "none",
        known_language: "none",
    });
    const [searchParams] = useSearchParams();
    const query = searchParams.get("firmidfilter");

    if (userId) {
        useEffect(() => {
            setIsLoading(true);
            axios
                .get(`http://localhost:3000/api/users/${userId}`)
                .then((response) => {
                    setIsLoading(false);
                    setUserDetails(response.data);
                    console.log(response.data);
                });
        }, []);
        return (
            <div className="modal-container">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="modal">
                        <div className="title">Kullanıcı Detay</div>
                        <div className="formgroup">
                            <label htmlFor="user-id">Id:</label>
                            <span>{userDetails.id}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="username">Username:</label>
                            <span>{userDetails.username}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="surname">Surname:</label>
                            <span>{userDetails.surname}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="mail">Mail:</label>
                            <span>{userDetails.mail}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="tel">Telefon:</label>
                            <span>{userDetails.tel}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="firmName">Firma Adı:</label>
                            <Link to={`/firms/${userDetails.firmId}`}>
                                {userDetails.firmName}
                            </Link>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="firmId">Firma Id:</label>
                            <span>{userDetails.firmId}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="status">Durum:</label>
                            <span>{userDetails.status}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="role">Rol:</label>
                            <span>{userDetails.role}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="birthdate">Doğum Günü:</label>
                            <span>{userDetails.birthdate}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="gender">Cinsiyet:</label>
                            <span>{userDetails.gender}</span>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="known_lang">Bilinen Diller:</label>
                            <span>{userDetails.known_language}</span>
                        </div>
                        <div className="btn-place">
                            <button
                                className="btn"
                                onClick={() => {
                                    navigate("/users");
                                }}
                            >
                                Geri
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default UserDetail;
