import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFirm, closeFirmModal, setNewFirm } from "../slice/newFirmSlice";
import { AppDispatch, AppState } from "../store/Store";
import "./new-modal.css";

type Props = {};

export const NewFirmModal = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const postFirm = useSelector(
        (state: AppState) => state.newFirm.newFirmData
    );
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
                    <button
                        className="add"
                        onClick={() => dispatch(addFirm(postFirm))}
                    >
                        Firmayı Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};
