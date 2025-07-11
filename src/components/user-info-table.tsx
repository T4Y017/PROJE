import "./user-info-table.css";
import User from "../interfaces/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import { openEditModal } from "../slice/editUserSlice";
import { EditUserModal } from "./edit-user-modal";
import { openDeleteModal } from "../slice/deleteUserSlice";
import { DeleteUserModal } from "./delete-user-modal";
import { useEffect } from "react";
import { fetchFirmData } from "../slice/firmSlice";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { openAuthorizationModal } from "../slice/userTaskFormSlice";
import { AuthorizationModal } from "./authorization-modal";
import { fetchUserData } from "../slice/userSlice";

export interface UserInfoTableProps {
    // @TODO: Add emp type
    emp: User[];
}

export const UserInfoTable: React.FC<UserInfoTableProps> = ({ emp }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const edit = useSelector((state: AppState) => state.editUser.userData);
    const firm = useSelector((state: AppState) => state.firm.firm?.firms);
    const isAuthorized = useSelector(
        (state: AppState) => state.authorization.isAuthorizationModalOpen
    );
    const deleteUser = useSelector(
        (state: AppState) => state.deleteUser.userData
    );
    const selectedUserID = useSelector(
        (state: AppState) => state.authorization.selectedUser.userId
    );
    const currentUserMail = useSelector((state: AppState) => state.auth.mail);
    const userPermissions = useSelector(
        (state: AppState) => state.auth.permissions
    );
    const loggedInUser = emp.find((user) => user.mail === currentUserMail);

    const userRole = useSelector((state: AppState) => state.auth.role);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    useEffect(() => {
        dispatch(fetchFirmData({ page }));
    }, []);
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Kullanıcı Adı</th>
                        <th>Kullanıcı Soyadı</th>
                        <th>Kullanıcı Maili</th>
                        <th>Kullanıcı Telefonu</th>
                        <th className="extend">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {emp.length > 0 ? (
                        emp.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.surname}</td>
                                <td>{user.mail}</td>
                                <td>{user.tel}</td>
                                <td>
                                    <div className="button-group">
                                        <button
                                            className="firm"
                                            disabled={
                                                !firm ||
                                                !firm?.some(
                                                    (f) => f.id === user.firmId
                                                )
                                            }
                                            onClick={() => {
                                                navigate(
                                                    `/firms/${user.firmId}`
                                                );
                                            }}
                                        >
                                            Firma Göster
                                        </button>

                                        <button
                                            className="firm"
                                            onClick={() => {
                                                navigate(`/users/${user.id}`);
                                            }}
                                        >
                                            {" "}
                                            Kullanıcı Detayı
                                        </button>

                                        {(userRole === "admin" ||
                                            userRole === "gözlemci") && (
                                            <>
                                                {user.role === "gözlemci" &&
                                                    userRole === "admin" && (
                                                        <button
                                                            className="firm"
                                                            onClick={() => {
                                                                console.log(
                                                                    user.permissions
                                                                );
                                                                dispatch(
                                                                    openAuthorizationModal(
                                                                        user.id
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Görev Ata
                                                        </button>
                                                    )}

                                                {(userRole === "admin" ||
                                                    userPermissions?.edit) && (
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() =>
                                                            dispatch(
                                                                openEditModal(
                                                                    user
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                )}

                                                {(userRole === "admin" ||
                                                    userPermissions?.delete) && (
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            dispatch(
                                                                openDeleteModal(
                                                                    user
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <PersonRemoveIcon />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="empty">
                            <td colSpan={5}>Hiç Eleman Yok</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isAuthorized && selectedUserID !== null && (
                <AuthorizationModal userId={selectedUserID} />
            )}
            {deleteUser && <DeleteUserModal userId={deleteUser.id} />}
            {edit && <EditUserModal userId={Number(edit.id)} />}
        </div>
    );
};
