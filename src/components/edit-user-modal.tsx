import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import {
    closeEditModal,
    editUser,
    editUserName,
    resetEdited,
} from "../slice/editUserSlice";
import "./new-modal.css";
import { fetchUserData } from "../slice/userSlice";
import { useSearchParams } from "react-router-dom";

interface Props {
    userId: number;
}

export const EditUserModal = ({ userId }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const edit = useSelector((state: AppState) => state.editUser.userData);
    const isEdited = useSelector((state: AppState) => state.editUser.isEdited);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("firmidfilter");
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const userPerPage = 2;
    useEffect(() => {
        if (isEdited?.type === "success") {
            dispatch(closeEditModal());
            dispatch(
                fetchUserData({
                    page,
                    limit: userPerPage,
                    firmidfilter: query ? Number(query) : undefined,
                })
            );
            dispatch(resetEdited());
        }
        if (isEdited?.type === "error") {
            alert(isEdited.message);
        }
    }, [isEdited]);
    console.log(userId);
    return (
        <div className="new-modal-container">
            <div className="new-modal">
                <div className="modal-header">
                    <h1>Kullanıcı Bilgi Editleme</h1>
                    <button
                        className="close"
                        onClick={() => dispatch(closeEditModal())}
                    >
                        X
                    </button>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Username:</label>
                    <input
                        type="text"
                        onChange={(e) =>
                            dispatch(
                                editUserName({
                                    ...edit,
                                    username: e.target.value,
                                })
                            )
                        }
                    />
                </div>

                <div>
                    <button
                        className="add"
                        onClick={() => {
                            dispatch(
                                editUser({
                                    id: userId,
                                    userData: {
                                        username: edit?.username,
                                    },
                                })
                            );
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};
