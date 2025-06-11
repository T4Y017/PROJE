import React from 'react'
import "./Modal.css"

export const Modal = ({onClose,firm}) => {

   
   
  return (
    <div className='modal-container'>

        <div className='modal'>

            <form>
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
                <button className='btn' > Close</button>
            </form>
        </div>
    </div>
  )
}
