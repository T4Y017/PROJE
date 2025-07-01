import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { closeDeleteFirmModal, deleteFirm } from "../slice/deleteFirmSlice";
import { fetchFirmData } from "../slice/firmSlice";
import { useSearchParams } from "react-router-dom";

interface Props {
    firmId: number;
}

export const DeleteFirmModal = ({ firmId }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const firmPerPage = 2;
    const handleDeleteFirm = async () => {
        const res = await dispatch(deleteFirm({ firmId: firmId }));
        if (res.payload.type === "success") {
            dispatch(closeDeleteFirmModal());
            dispatch(fetchFirmData({ page, limit: firmPerPage }));
        } else if (res.payload.type === "error") {
            alert("Firma silinemedi!");
        }
    };
    return (
        <div className="new-modal-container">
            <div className="new-modal">
                <div className="modal-header">
                    <h3>Firma Silme</h3>
                    <button
                        className="close"
                        onClick={() => dispatch(closeDeleteFirmModal())}
                    >
                        X
                    </button>
                </div>
                <div>Firmayı silmek istediğinize emin misiniz?</div>
                <div className="btn-group">
                    <button className="delete" onClick={handleDeleteFirm}>
                        Sil
                    </button>
                    <button
                        className="cancel"
                        onClick={() => dispatch(closeDeleteFirmModal())}
                    >
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};
