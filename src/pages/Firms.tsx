import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import "./Firm.css";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { fetchFirmData } from "../slice/firmSlice";
import Spinner from "../components/spinner";
import { openFirmModal } from "../slice/newFirmSlice";
import { NewFirmModal } from "../components/new-firm-modal";
import { openEditModal } from "../slice/editFirmSlice";
import { EditFirmModal } from "../components/edit-firm-modal";
import { openDeleteFirmModal } from "../slice/deleteFirmSlice";
import { DeleteFirmModal } from "../components/delete-firm-modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

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
    const { isNewFirmModalOpen } = useSelector(
        (state: AppState) => state.newFirm
    );

    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: AppState) => state.firm.firm);
    const edit = useSelector((state: AppState) => state.editFirm.firmData);
    const deleteFirm = useSelector(
        (state: AppState) => state.deleteFirm.firmData
    );
    useEffect(() => {
        dispatch(fetchFirmData({ page, limit: firmPerPage }));
    }, [page]);

    const paginate = (pageNumber) => navigate("?page=" + pageNumber);
    const handleEditFirm = (firma) => {
        dispatch(openFirmModal(firma));
    };
    const handleEditModal = (firma) => {
        dispatch(openEditModal(firma));
    };
    const handleDeleteFirm = (firma) => {
        dispatch(openDeleteFirmModal(firma));
    };
    return (
        <div className="firm-container">
            <div className="btn-place">
                <button
                    className="btn"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Geri
                </button>
                <button className="btn" onClick={() => navigate("/")}>
                    Ana Sayfa
                </button>
            </div>
            {loadFirmTaskStatus?.type === "loading" ? (
                <Spinner />
            ) : loadFirmTaskStatus?.type === "success" ? (
                <>
                    <button className="btn" onClick={handleEditFirm}>
                        <span>
                            <p>Yeni Firma Ekle</p>
                            <AddBusinessIcon />
                        </span>
                    </button>
                    {isNewFirmModalOpen && <NewFirmModal />}
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
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.firms && data.firms.length > 0 ? (
                                        data.firms.map((firma) => (
                                            <tr key={firma.id}>
                                                <td>
                                                    <Link
                                                        to={`/firms/${firma.id}`}
                                                    >
                                                        {firma.firmName}
                                                    </Link>
                                                </td>
                                                <td>{firma.address}</td>
                                                <td>{firma.firmMail}</td>
                                                <td>{firma.firmType}</td>
                                                <td>{firma.tel}</td>
                                                <td>
                                                    {
                                                        firma.current_working_person
                                                    }
                                                </td>
                                                <td>{firma.firmStatus}</td>
                                                <td>
                                                    <div className="button-group">
                                                        <button
                                                            className="btn-edit"
                                                            onClick={() =>
                                                                handleEditModal(
                                                                    firma
                                                                )
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </button>
                                                        <button
                                                            className="btn-delete"
                                                            onClick={() =>
                                                                handleDeleteFirm(
                                                                    firma
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="empty">
                                            <td colSpan={8}>Hiç Eleman Yok</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {deleteFirm && (
                                <DeleteFirmModal firmId={deleteFirm.id} />
                            )}
                            {edit && <EditFirmModal firmId={edit.id} />}
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
