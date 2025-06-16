import React from 'react'
import { UserInfoModal } from '../components/user-info-modal'
import { useSearchParams } from 'react-router';
import FirmUsers from './FirmUsers';

interface Props  {
  userId:number;
}

const Users = ({userId}: Props) => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('firmidfilter');
  console.log("query:",query)

  if(userId){

    return (
      <div>
        <UserInfoModal  userId={userId} /> 
    </div>
  )
  }
  if(query) {
    return(
    <div>
      <FirmUsers firmId={Number(query)} />
    </div>
  ) }
}

export default Users