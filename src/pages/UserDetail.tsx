import React, { useEffect } from "react";
import Spinner from "../components/spinner";
import "./info-modal.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { fetchUserDetailData } from "../slice/userDetailSlice";
interface Props {
    userId: number;
}

const UserDetail = ({ userId }: Props) => {
    const navigate = useNavigate();

    const isLoading = useSelector(
        (state: AppState) => state.userDetails.userDetailTaskStatus
    );
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: AppState) => state.userDetails.detail);
    const firms = useSelector((state: AppState) => state.firm.firm?.firms);
    const isDisabled =
        !data.firmId ||
        !data.firmName ||
        !firms?.find((f) => f.id === data.firmId);
    useEffect(() => {
        dispatch(fetchUserDetailData({ userId }));
    }, []);

    return (
        <div className="modal-container">
            {isLoading?.type === "loading" ? (
                <Spinner />
            ) : isLoading?.type === "success" ? (
                <div className="modal">
                    <div className="title">Kullanıcı Detay</div>
                    <div className="formgroup">
                        <label htmlFor="user-id">Id:</label>
                        <span>{data.id}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="username">Username:</label>
                        <span>{data.username}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="surname">Surname:</label>
                        <span>{data.surname}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="mail">Mail:</label>
                        <span>{data.mail}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="tel">Telefon:</label>
                        <span>{data.tel}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmName">Firma Adı:</label>
                        {isDisabled ? (
                            <span className="disabled-link">
                                {data.firmName || "Firma Yok"}
                            </span>
                        ) : (
                            <Link to={`/firms/${data.firmId}`}>
                                {data.firmName}
                            </Link>
                        )}
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmId">Firma Id:</label>
                        <span>{data.firmId}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="status">Durum:</label>
                        <span>{data.status}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="role">Rol:</label>
                        <span>{data.role}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="birthdate">Doğum Günü:</label>
                        <span>{data.birthdate}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="gender">Cinsiyet:</label>
                        <span>{data.gender}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="known_lang">Bilinen Diller:</label>
                        <span>{data.known_language}</span>
                    </div>
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
                </div>
            ) : (
                <div style={{ color: "red" }}>{isLoading?.message}</div>
            )}
        </div>
    );
};

export default UserDetail;
