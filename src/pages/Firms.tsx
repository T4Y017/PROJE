import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Firm from "../interfaces/Firm";
import "./Firm.css";
import Pagination from "../components/Pagination";

type Props = {};

const Firms = (props: Props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [firm, setFirm] = useState<Firm[]>([]);
    const page = searchParams.get("page") || 1;
    const firmPerPage = 2;
    const [totalFirm, setTotalFirm] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const getFirmInfo = () => {
        axios
            .get("http://localhost:3000/api/firms", {
                params: {
                    page,
                    limit: firmPerPage,
                },
            })
            .then((resp) => {
                console.log(resp);
                setTotalPage(resp.data.totalPage);
                setTotalFirm(resp.data.totalFirm);
                setFirm(resp.data.firms);
            });
    };

    useEffect(() => {
        getFirmInfo();
    }, [page]);

    const paginate = (pageNumber) => navigate("?page=" + pageNumber);

    return (
        <div>
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
                                <th className="extend">
                                    Firma Çalışan Sayısı{" "}
                                </th>
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
            {totalPage > 1 && (
                <Pagination
                    infoPerPage={firmPerPage}
                    totalData={totalFirm}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

export default Firms;
