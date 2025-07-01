import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addFirm,
    closeFirmModal,
    resetIsFirmAdded,
    setNewFirm,
} from "../slice/newFirmSlice";
import { AppDispatch, AppState } from "../store/Store";
import "./new-modal.css";
import { closeNewUserModal } from "../slice/newUserSlice";
import { fetchFirmData } from "../slice/firmSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

export const NewFirmModal = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // <-- EKLENDİ

    const postFirm = useSelector(
        (state: AppState) => state.newFirm.newFirmData
    );

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const firmPerPage = 2;
    const handleAddFirm = async () => {
        const res = await dispatch(addFirm(postFirm));
        if (res.payload.type === "success") {
            dispatch(closeFirmModal());
            // Önce firma listesini son sayfa için çek
            const result = await dispatch(
                fetchFirmData({ page, limit: firmPerPage })
            ); // 1. sayfadan başla
            // Eğer firma ekleme başarılıysa, son sayfaya yönlendir
            const totalFirm = result?.payload.totalFirm + 1;
            const totalPage = Math.ceil(totalFirm / firmPerPage);
            console.log("Total Page:", totalPage);
            navigate(`?page=${totalPage}`);
        } else if (res.payload.type === "error") {
            alert("Firma eklenemedi!!");
        }
    };

    return (
        <div className="new-modal-container">
            <div className="new-modal">
                <div className="modal-header">
                    <h1>Firma Ekleme Paneli</h1>
                    <button
                        className="close"
                        onClick={() => dispatch(closeFirmModal())}
                    >
                        X
                    </button>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Id:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    id: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Adı:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    firmName: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Address:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    address: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Mail:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    firmMail: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Telefon:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({ ...postFirm, tel: e.target.value })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Çeşidi:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    firmType: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Durumu:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    firmStatus: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Enlem:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    latitude: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Boylam:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewFirm({
                                    ...postFirm,
                                    longitude: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div>
                    <button className="add" onClick={handleAddFirm}>
                        Firmayı Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};
