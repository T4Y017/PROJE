import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import {
    closeAuthorizationModal,
    giveAuthorization,
    setPermissions,
} from "../slice/userTaskFormSlice";

interface Props {
    userId: number | null;
}

export const AuthorizationModal = ({ userId }: Props) => {
    console.log("userid", userId);
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: AppState) => state.user.user?.users);
    console.log("userdata", userData);
    const selectedUser = userData?.find((u) => Number(u.id) === userId);
    console.log("selecteduser", selectedUser);

    const handleSave = () => {
        dispatch(
            giveAuthorization({
                userId: Number(userId),
                permissions: permissions,
            })
        );
        dispatch(closeAuthorizationModal());
    };

    useEffect(() => {
        if (selectedUser) {
            dispatch(setPermissions(selectedUser.permissions));
        }
    }, [selectedUser, dispatch]);

    const permissions = useSelector(
        (state: AppState) => state.authorization.permissions
    );

    return (
        <div className="new-modal-container">
            {selectedUser ? (
                <div className="new-modal">
                    <div className="modal-header">
                        <h3>Gözlemci Yetkileri</h3>
                        <button
                            className="close"
                            onClick={() => dispatch(closeAuthorizationModal())}
                        >
                            X
                        </button>
                    </div>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            checked={permissions.edit}
                            onChange={(e) =>
                                dispatch(
                                    setPermissions({
                                        ...permissions,
                                        edit: e.target.checked,
                                    })
                                )
                            }
                        />
                        Editleme
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            checked={permissions.delete}
                            onChange={(e) =>
                                dispatch(
                                    setPermissions({
                                        ...permissions,
                                        delete: e.target.checked,
                                    })
                                )
                            }
                        />
                        Silme
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            checked={permissions.addUser}
                            onChange={(e) =>
                                dispatch(
                                    setPermissions({
                                        ...permissions,
                                        addUser: e.target.checked,
                                    })
                                )
                            }
                        />
                        Kullanıcı Ekleme
                    </label>
                    <button className="btn" onClick={handleSave}>
                        Kaydet
                    </button>
                </div>
            ) : (
                <div>Kullanıcı bulunamadı.</div>
            )}
        </div>
    );
};
