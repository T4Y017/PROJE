import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FirmInfoModal } from '../components/firm-info-modal';
import Firm from '../interfaces/Firm';

interface Props  {
    firmId:number;
}



const Firms = ({firmId}: Props) => {
    


   return (
    <div className='modal-container'>

        <FirmInfoModal firmId={firmId}/>
    </div>
  )


}

export default Firms