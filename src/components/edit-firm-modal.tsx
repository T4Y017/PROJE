import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFirmName, editFirm } from "../slice/editFirmSlice";
import { closeEditModal, resetEdited } from "../slice/editUserSlice";
import { AppDispatch, AppState } from "../store/Store";
import { fetchUserData } from "../slice/userSlice";
import { useSearchParams } from "react-router-dom";
import { fetchFirmData } from "../slice/firmSlice";

interface Props {
    firmId: number;
}

export const EditFirmModal = ({ firmId }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const edit = useSelector((state: AppState) => state.editFirm.firmData);
    const isEdited = useSelector((state: AppState) => state.editFirm.isEdited);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const firmPerPage = 2;
    useEffect(() => {
        if (isEdited?.type === "success") {
            dispatch(closeEditModal());
            dispatch(
                fetchFirmData({
                    page,
                    limit: firmPerPage,
                })
            );
            dispatch(resetEdited());
        }
        if (isEdited?.type === "error") {
            alert(isEdited.message);
        }
    }, [isEdited]);
    console.log(firmId);
    return (
        <div className="new-modal-container">
            <div className="new-modal">
                <div className="modal-header">
                    <h1>Firma Bilgi Editleme</h1>
                    <button
                        className="close"
                        onClick={() => dispatch(closeEditModal())}
                    >
                        X
                    </button>
                </div>
                <div className="label-modals">
                    <label htmlFor="">Firma Adı:</label>
                    <input
                        type="text"
                        onChange={(e) =>
                            dispatch(
                                editFirmName({
                                    ...edit,
                                    firmName: e.target.value,
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
                                editFirm({
                                    id: firmId,
                                    firmData: {
                                        firmName: edit?.firmName,
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
