import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/Store";
import {
    closeAuthorizationModal,
    giveAuthorization,
    setPermissions,
} from "../slice/userTaskFormSlice";
import { Permission } from "../interfaces/user";
import { fetchUserData } from "../slice/userSlice";
import { useSearchParams } from "react-router-dom";

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

    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
    const handleSave = async () => {
        await dispatch(
            giveAuthorization({
                userId: Number(userId),
                permissions: allPermissions,
            })
        );
        await dispatch(fetchUserData({ page }));
        dispatch(closeAuthorizationModal());
    };

    const togglePermission = (perm: Permission) => {
        setAllPermissions((prev) => {
            console.log(prev);
            return prev.includes(perm)
                ? prev.filter((it) => it !== perm)
                : [...prev, perm];
        });
    };

    useEffect(() => {
        if (selectedUser) {
            console.log(selectedUser);
            setAllPermissions(selectedUser.permissions);
        }
    }, [selectedUser, dispatch]);

    return (
        <div className="new-modal-container">
            {selectedUser ? (
                <div className="new-modal">
                    <div className="modal-header">
                        <h3>Yetki Modalı</h3>
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
                            checked={allPermissions.includes(Permission.Edit)}
                            onChange={(e) => togglePermission(Permission.Edit)}
                        />
                        Editleme
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            checked={allPermissions.includes(Permission.Delete)}
                            onChange={(e) =>
                                togglePermission(Permission.Delete)
                            }
                        />
                        Silme
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            checked={allPermissions.includes(
                                Permission.AddUser
                            )}
                            onChange={(e) =>
                                togglePermission(Permission.AddUser)
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
