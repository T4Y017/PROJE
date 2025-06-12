import React from 'react'
import "./firm_info_modal.css"

export const Firm_info_modal = ({onClose,firmRequest}) => {
   
  const firm = firmRequest();  
  return (
    <div className='modal-container'>

        <div className='modal'>

           
                <div className='formgroup'>
                    <label htmlFor="id">Id:</label>
                    <span>{firm.id}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firmname">Firma Adı:</label>
                    <span>{firm.firmName}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firmaddress">Address:</label>
                    <span>{firm.address}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firmmail">Mail:</label>
                    <span>{firm.firmMail}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-tel">Telefon:</label>
                    <span>{firm.tel}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-current_employee">Güncel Çalışan Sayısı:</label>
                    <span>{firm.current_working_person}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-type">Firma Çeşidi:</label>
                    <span>{firm.firmType}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-status">Firma Durumu:</label>
                    <span>{firm.firmStatus}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-latitude">Enlem:</label>
                    <span>{firm.latitude}</span>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-longitude">Boylam:</label>
                    <span>{firm.longitude}</span>
                </div>
                <button className='btn' onClick={onClose}> Close</button>
            
        </div>
    </div>
  )
}
