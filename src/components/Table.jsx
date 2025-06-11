import React from "react";
import { useState } from "react";
import "./Table.css"
import { Modal } from "./Modal";

export const Table = ({setIsOpen}) => {
    
    const onFirmClick= () => {
        setIsOpen(true);
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
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Oktay</td>
                        <td>Giniş</td>
                        <td>oktay@gmail.com</td>
                        <td>05535547477</td>
                        <td className="firm" onClick={() => onFirmClick()}>Sigun</td>
                    </tr>
                    <tr>
                        <td>Mehmet</td>
                        <td>Yıldırım</td>
                        <td>mehmet@yahoo.com</td>
                        <td>05630862663</td>
                        <td className="firm" onClick={() => onFirmClick()}>Amazon</td>
                    </tr>
                    <tr>
                        <td>Ayşe</td>
                        <td>Kütük</td>
                        <td>ayşe@hotmail.com</td>
                        <td>053562163327</td>
                        <td className="firm" onClick={() => onFirmClick()}>Amazon</td>
                    </tr>
                    <tr>
                        <td>Ersan</td>
                        <td>Aşık</td>
                        <td>ersan@gmail.com</td>
                        <td>051223522623</td>
                        <td className="firm" onClick={() => onFirmClick()}>Sigun</td>
                    </tr>
                    <tr>
                        <td>Ali</td>
                        <td>Yılmaz</td>
                        <td>ali@yahoo.com</td>
                        <td>056420078702</td>
                        <td className="firm" onClick={() => onFirmClick()}>Meta</td>
                    </tr>
                    <tr>
                        <td>Sinem</td>
                        <td>Çetin</td>
                        <td>sinem@hotmail.com</td>
                        <td>052186200626</td>
                        <td className="firm" onClick={() => onFirmClick()}>Meta</td>
                    </tr>
                    <tr>
                        <td>Deniz</td>
                        <td>Diken</td>
                        <td>deniz@hotmail.com</td>
                        <td>052762691813</td>
                        <td className="firm" onClick={() => onFirmClick()}>Siemens</td>
                    </tr>
                    <tr>
                        <td>Mert</td>
                        <td>Keleş</td>
                        <td>mert@gmail.com</td>
                        <td>056216246443</td>
                        <td className="firm" onClick={() => onFirmClick()}>Havelsan</td>
                    </tr>
                    <tr>
                        <td>Sezer</td>
                        <td>Korkmaz</td>
                        <td>sezer@yahoo.com</td>
                        <td>052626726232</td>
                        <td className="firm" onClick={() => onFirmClick()}>Havelsan</td>
                    </tr>
                    <tr>
                        <td>Duru</td>
                        <td>Dilli</td>
                        <td>duru@yahoo.com</td>
                        <td>057235262616</td>
                        <td className="firm" onClick={() => onFirmClick()}>Siemens</td>
                    </tr>
                </tbody>
            </table>
       </div>
        
    )
}