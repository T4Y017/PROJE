import "./user-info-table.css"

export interface User_info_tableProps {
    setIsOpen: (value: boolean) => void;
    setFirmID: (value: number) => void;
    setUserID: (value: number) => void;
    // @TODO: Add emp type
    emp: any;
}

export const User_info_table: React.FC<User_info_tableProps> = ({setIsOpen, setFirmID, setUserID, emp}) => {

    const onFirmClick = (id: number) => {
        setIsOpen(true);
        setFirmID(id);
    }
    const onUserClick = (id: number) => {
        setIsOpen(true);
        setUserID(id);
    }

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
                {emp.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.surname}</td>
                        <td>{user.mail}</td>
                        <td>{user.tel}</td>
                        <td>
                            <button className="firm"
                                    onClick={() => onFirmClick(user.firmId)}>Firma Göster
                            </button>
                        </td>
                        <td>
                            <button className="firm"
                                    onClick={() => onUserClick(user.id)}> Kullanıcı Detayı
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
