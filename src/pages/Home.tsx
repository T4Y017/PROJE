import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserInfoTable } from '../components/user-info-table'
import User from '../interfaces/user'
import { FirmInfoModal } from '../components/firm-info-modal'
import { UserInfoModal } from '../components/user-info-modal'
import { useQuery } from '@tanstack/react-query'
type Props = {}

const Home = (props: Props) => {
  const [isFirmModalOpen, setIsOpen] = useState<boolean>(false)  
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false)

 const [firmID, setFirmID] = useState<number>();
 const [userID, setUserID] = useState<number>(); 
 const [employee, setUser] = useState<User[]>([]);


 const handleCloseFirmModal = () => {
    setIsOpen(false);
 }
 const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
 }

 const getUserInfo = () => {
       axios.get("http://localhost:3000/api/users").then((resp) => {
           console.log(resp);
           setUser(resp.data.users);
       }
       );
     };
     useEffect(() => {
       getUserInfo();
     },[]);

  return (
    <>

    <UserInfoTable setIsOpen={setIsOpen} setIsUserModalOpen={setIsUserModalOpen} setFirmID={setFirmID} emp={employee} setUserID={setUserID} />
    {isFirmModalOpen && <FirmInfoModal  firmId={firmID}/> }
    {isUserModalOpen && <UserInfoModal  userId={userID}/> }
    </>
    )
}

export default Home