import axios from 'axios';
import React, { useEffect, useState } from 'react'
import User from '../interfaces/user';
import { Link } from 'react-router-dom';
import "./firm-user.css"
interface Props  {
    firmId:number;
}

const FirmUsers = ({firmId}: Props) => {

   const [userDetails,setUserDetails] = useState<User[]>([]);



  useEffect(() => {
    axios.get(`http://localhost:3000/api/users?firmidfilter=${firmId}`).then((response) => {
        setUserDetails(response.data.users);
        console.log(response.data.users);
    })
  },[]) 

  return (
    <div className='modal-firm-container'>
        {userDetails.map((user) => (
        
            <div  key={user.username}>
            <div className='modal' >
            <div className='formgroup'>
                    <label htmlFor="user-id">Id:</label>
                    <span>{user.id}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="username">Username:</label>
                <span>{user.username}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="surname">Surname:</label>
                <span>{user.surname}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="mail">Mail:</label>
                <span>{user.mail}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="tel">Telefon:</label>
                <span>{user.tel}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="firmName">Firma Adı:</label>
                <Link to={`/firms/${user.firmId}`}>{user.firmName}</Link>
            </div>
            <div className='formgroup'>
                <label htmlFor="firmId">Firma Id:</label>
                <span>{user.firmId}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="status">Durum:</label>
                <span>{user.status}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="role">Rol:</label>
                <span>{user.role}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="birthdate">Doğum Günü:</label>
                <span>{user.birthdate}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="gender">Cinsiyet:</label>
                <span>{user.gender}</span>
            </div>
            <div className='formgroup'>
                <label htmlFor="known_lang">Bilinen Diller:</label>
                <span>{user.known_language}</span>
            </div>
         </div>
         </div>
            
        ))}
    </div>
  )
}

export default FirmUsers