import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Firm.css";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { fetchFirmData } from "../slice/firmSlice";
import Spinner from "../components/spinner";

type Props = {};

const Firms = (props: Props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const firmPerPage = 2;
    const loadFirmTaskStatus = useSelector(
        (state: AppState) => state.firm.loadFirmStatus
    );
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: AppState) => state.firm.firm);
    useEffect(() => {
        dispatch(fetchFirmData({ page, limit: firmPerPage }));
    }, [page]);

    const paginate = (pageNumber) => navigate("?page=" + pageNumber);

    return (
        <div>
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
            {loadFirmTaskStatus?.type === "loading" ? (
                <Spinner />
            ) : loadFirmTaskStatus?.type === "success" ? (
                <>
                    <div className="firm-table">
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
                                    {data?.firms.map((firma) => (
                                        <tr key={firma.id}>
                                            <td>{firma.firmName}</td>
                                            <td>{firma.address}</td>
                                            <td>{firma.firmMail}</td>
                                            <td>{firma.firmType}</td>
                                            <td>{firma.tel}</td>
                                            <td>
                                                {firma.current_working_person}
                                            </td>
                                            <td>{firma.firmStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {data && data.totalPage > 1 && (
                        <Pagination
                            infoPerPage={firmPerPage}
                            totalData={data.totalFirm}
                            paginate={paginate}
                        />
                    )}
                </>
            ) : (
                <div style={{ color: "red" }}>
                    {loadFirmTaskStatus?.message}
                </div>
            )}
        </div>
    );
};

export default Firms;
