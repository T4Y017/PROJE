import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { closeDeleteModal, deleteUser } from "../slice/deleteUserSlice";
import { useSearchParams } from "react-router-dom";
import { fetchUserData } from "../slice/userSlice";
import WarningIcon from "@mui/icons-material/Warning";
import "./new-modal.css";

interface Props {
    userId: number;
}

export const DeleteUserModal = ({ userId }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const handleDeleteUser = async () => {
        const res = await dispatch(deleteUser({ id: userId }));
        if (res?.payload?.type === "success") {
            dispatch(closeDeleteModal());
            dispatch(fetchUserData({ page }));
        } else if (res?.payload?.type === "error") {
            alert("Kullanıcı silinemedi!");
        }
    };
    return (
        <div className="new-modal-container">
            <div className="new-modal">
                <div className="modal-header">
                    <h3>Kullanıcıyı Silme</h3>
                    <button
                        className="close"
                        onClick={() => dispatch(closeDeleteModal())}
                    >
                        X
                    </button>
                </div>
                <div className="warning-icon">
                    <WarningIcon style={{ fontSize: 90 }} />
                </div>
                <div>Kullanıcıyı silmek istediğinize emin misiniz?</div>
                <div className="btn-group">
                    <button className="delete" onClick={handleDeleteUser}>
                        Sil
                    </button>
                    <button
                        className="cancel"
                        onClick={() => dispatch(closeDeleteModal())}
                    >
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};
