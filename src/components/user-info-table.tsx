import React from "react";
import { useEffect,useState } from "react";
import "./user-info-table.css"
import { useNavigate } from "react-router-dom";


export const UserInfoTable = ({setIsOpen,setFirmID,emp,setUserID,setIsUserModalOpen}) => {

    const navigate = useNavigate();
    
    const onFirmClick= (id: number) => {
        setIsOpen(true);
        setFirmID(id);
    }
    const onUserClick = (id: number) => {
        setIsUserModalOpen(true);
        setUserID(id);
    }
     
    
    return (
        
       <div className="table-wrapper">
        
            <table className="table">
                <thead >
                    <tr>
                        <th>Kullanıcı Adı</th>
                        <th>Kullanıcı Soyadı</th>
                        <th>Kullanıcı Maili</th>
                        <th>Kullanıcı Telefonu</th>
                        <th colSpan={2} className="extend">İşlemler</th>
                    </tr>
                </thead>
                <tbody >
                    {emp.map((user) => (
                        
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.surname}</td>
                        <td>{user.mail}</td>
                        <td>{user.tel}</td>
                        <td><button className="firm" onClick={() => {onFirmClick(user.firmId); navigate(`/firms/${user.firmId}`)}}>Firma Göster</button></td>
                        <td><button className="firm" onClick={() => {onUserClick(user.id); navigate(`/users/${user.id}`)}}> Kullanıcı Detayı</button></td>
                    </tr>
                     ))}
                    
                
                </tbody>
            </table>
           
       </div>
        
    )
}
