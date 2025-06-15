import React from 'react'
import { UserInfoModal } from '../components/user-info-modal'

interface Props  {
  userId:number;
}

const Users = ({userId}: Props) => {
  return (
    <div>
        Users
        <UserInfoModal  userId={userId}/> 
    </div>
  )
}

export default Users