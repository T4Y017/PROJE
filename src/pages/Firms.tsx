import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Firm from "../interfaces/Firm";
import "./Firm.css";

type Props = {};

const Firms = (props: Props) => {
    const navigate = useNavigate();
    const [firm, setFirm] = useState<Firm[]>([]);
    const getFirmInfo = () => {
        axios.get("http://localhost:3000/api/firms").then((resp) => {
            console.log(resp);

            setFirm(resp.data);
        });
    };

    useEffect(() => {
        getFirmInfo();
    }, []);

    return (
        <div className="firm-table">
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
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Firma Adı</th>
                            <th>Firma Adres</th>
                            <th>Firma Maili</th>
                            <th>Firma Çeşidi</th>
                            <th>Firma Telefonu</th>
                            <th className="extend">Firma Çalışan Sayısı </th>
                            <th>Firma Durumu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {firm.map((firma) => (
                            <tr key={firma.id}>
                                <td>{firma.firmName}</td>
                                <td>{firma.address}</td>
                                <td>{firma.firmMail}</td>
                                <td>{firma.firmType}</td>
                                <td>{firma.tel}</td>
                                <td>{firma.current_working_person}</td>
                                <td>{firma.firmStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Firms;
