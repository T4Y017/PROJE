import "./user-info-table.css";
import User from "../interfaces/user";
import { useNavigate } from "react-router-dom";

export interface UserInfoTableProps {
    // @TODO: Add emp type
    emp: User[];
}

export const UserInfoTable: React.FC<UserInfoTableProps> = ({ emp }) => {
    const navigate = useNavigate();

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
                                    <div style={{ display: "flex" }}>
                                        <button
                                            style={{ marginRight: 10 }}
                                            className="firm"
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
        </div>
    );
};
