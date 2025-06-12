import React from "react";
import { useState } from "react";
import "./Table.css"
import { Modal } from "./Modal";

export const Table = ({setIsOpen,setFirmID,emp}) => {
    
    const onFirmClick= (id) => {
        setIsOpen(true);
        setFirmID(id);
    }
    
    return (
        
       <div className="table-wrapper">
        
            <table className="table">
                <thead align="center" >
                    <tr>
                        <th>Kullanıcı Adı</th>
                        <th>Kullanıcı Soyadı</th>
                        <th>Kullanıcı Maili</th>
                        <th>Kullanıcı Telefonu</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {emp.map((user) => (
                        
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.surname}</td>
                        <td>{user.mail}</td>
                        <td>{user.tel}</td>
                        <td className="firm" onClick={() => onFirmClick(user.firmId)}>{user.firmName}</td>
                    </tr>
                     ))}
                    
                
                </tbody>
            </table>
           
       </div>
        
    )
}