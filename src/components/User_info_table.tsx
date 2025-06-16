import "./user_info_table.css"

export interface User_info_tableProps {
    setIsOpen: (value: boolean) => void;
    setFirmID: (value: number) => void;
    // @TODO: Add emp type
    emp: any;
}

export const User_info_table = ({setIsOpen, setFirmID, emp}) => {

    const onFirmClick = (id: number) => {
        setIsOpen(true);
        setFirmID(id);
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
                            <button className="firm"> Kullanıcı Detayı</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
