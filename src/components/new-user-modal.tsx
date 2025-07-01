import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import {
    addNewUser,
    closeNewUserModal,
    resetIsUserAdded,
    setNewUser,
} from "../slice/newUserSlice";
import { useSearchParams } from "react-router-dom";
import { fetchFirmData } from "../slice/firmSlice";
import "./new-modal.css";
import { fetchUserData } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function NewUserModal({}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // <-- EKLENDİ

    const postData = useSelector(
        (state: AppState) => state.newUser.newUserData
    );
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const firms = useSelector((state: AppState) => state.firm.firm?.firms);

    const handleAddUser = async () => {
        const res = await dispatch(addNewUser(postData));
        if (res.payload?.type === "success") {
            dispatch(closeNewUserModal());
            // Önce kullanıcı listesini son sayfa için çek
            const result = await dispatch(fetchUserData({ page })); // 1. sayfadan başla
            // Eğer kullanıcı ekleme başarılıysa, son sayfaya yönlendir
            const totalPage = result.totalPage; // Son sayfa sayısını al

            console.log("Total Page:", totalPage);
            navigate(`?page=${totalPage}`);
        } else if (res.payload?.type === "error") {
            alert("Kullanıcı eklenemedi!!");
        }
    };

    return (
        <div className="new-modal-container">
            <div className="new-modal">
                <div className="modal-header">
                    <h1>Kullanıcı Ekleme Paneli</h1>
                    <button
                        className="close"
                        onClick={() => dispatch(closeNewUserModal())}
                    >
                        X
                    </button>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Id:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    id: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Username:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    username: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Surname:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    surname: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Mail:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    mail: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Telefon:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    tel: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="firmName">Firma Adı:</label>
                    <select
                        className="label-modals"
                        onChange={(e) => {
                            const selectedFirmId = e.target.value;
                            const selectedFirm = firms?.find(
                                (f) => f.id === Number(selectedFirmId)
                            );

                            dispatch(
                                setNewUser({
                                    ...postData,
                                    firmId: e.target.value,
                                    firmName: selectedFirm?.firmName,
                                })
                            );
                        }}
                    >
                        <option value="">Firma Seçin...</option>
                        {firms?.map((firm) => (
                            <option key={firm.id} value={firm.id}>
                                {firm.firmName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Durum:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    status: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Rol:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    role: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Doğum Günü:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    birthdate: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Cinsiyet:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    gender: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Bilinen Diller:</label>
                    <input
                        onChange={(e) =>
                            dispatch(
                                setNewUser({
                                    ...postData,
                                    known_language: e.target.value,
                                })
                            )
                        }
                    ></input>
                </div>
                <div>
                    <button className="add" onClick={handleAddUser}>
                        Kullanıcıyı Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}
