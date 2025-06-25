import React, { useEffect } from "react";
import Spinner from "../components/spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { fetchFirmDetailData } from "../slice/firmDetailSlice";

interface Props {
    firmId: number;
}

const FirmDetail = ({ firmId }: Props) => {
    const navigate = useNavigate();

    const isLoading = useSelector(
        (state: AppState) => state.firmDetails.firmDetailTaskStatus
    );
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: AppState) => state.firmDetails.detail);
    useEffect(() => {
        dispatch(fetchFirmDetailData({ firmId }));
    }, []);

    return (
        <div className="modal-container">
            {isLoading?.type === "loading" ? (
                <Spinner />
            ) : isLoading?.type === "success" ? (
                <div className="modal">
                    <div className="title">Firma Detay </div>
                    <div className="formgroup">
                        <label htmlFor="id">Id:</label>
                        <span>{data.id}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmname">Firma Adı:</label>
                        <span>{data.firmName}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmaddress">Address:</label>
                        <span>{data.address}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmmail">Mail:</label>
                        <span>{data.firmMail}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-tel">Telefon:</label>
                        <span>{data.tel}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-current_employee">
                            Güncel Çalışan Sayısı:
                        </label>
                        <span>{data.current_working_person}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-type">Firma Çeşidi:</label>
                        <span>{data.firmType}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-status">Firma Durumu:</label>
                        <span>{data.firmStatus}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-latitude">Enlem:</label>
                        <span>{data.latitude}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-longitude">Boylam:</label>
                        <span>{data.longitude}</span>
                    </div>
                    <div className="formgroup">
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
                        <button
                            className="btn"
                            onClick={() => {
                                navigate(`/users?firmidfilter=${data.id}`);
                            }}
                        >
                            Firma Kullanıcılarını Göster
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ color: "red" }}>{isLoading?.message}</div>
            )}
        </div>
    );
};

export default FirmDetail;
