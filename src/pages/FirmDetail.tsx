import React, { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import axios from "axios";
import Firm from "../interfaces/Firm";
import { useNavigate } from "react-router-dom";

interface Props {
    firmId: number;
}

const FirmDetail = ({ firmId }: Props) => {
    const navigate = useNavigate();
    const [firmDetails, setFirmDetails] = useState<Firm>({
        id: 0,
        firmName: "none",
        firmMail: "none",
        address: "none",
        tel: "none",
        current_working_person: 0,
        firmType: "none",
        firmStatus: "none",
        latitude: 0,
        longitude: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        axios
            .get(`http://localhost:3000/api/firms/${firmId}`)
            .then((response) => {
                setIsLoading(false);

                setFirmDetails(response.data);
            });
    }, []);

    return (
        <div className="modal-container">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="modal">
                    <div className="title">Firma Detay </div>
                    <div className="formgroup">
                        <label htmlFor="id">Id:</label>
                        <span>{firmDetails.id}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmname">Firma Adı:</label>
                        <span>{firmDetails.firmName}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmaddress">Address:</label>
                        <span>{firmDetails.address}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firmmail">Mail:</label>
                        <span>{firmDetails.firmMail}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-tel">Telefon:</label>
                        <span>{firmDetails.tel}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-current_employee">
                            Güncel Çalışan Sayısı:
                        </label>
                        <span>{firmDetails.current_working_person}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-type">Firma Çeşidi:</label>
                        <span>{firmDetails.firmType}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-status">Firma Durumu:</label>
                        <span>{firmDetails.firmStatus}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-latitude">Enlem:</label>
                        <span>{firmDetails.latitude}</span>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="firm-longitude">Boylam:</label>
                        <span>{firmDetails.longitude}</span>
                    </div>
                    <div className="formgroup">
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
                        <button
                            className="btn"
                            onClick={() => {
                                navigate(
                                    `/users?firmidfilter=${firmDetails.id}`
                                );
                            }}
                        >
                            Firma Kullanıcılarını Göster
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirmDetail;
