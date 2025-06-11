import React from 'react'
import "./Modal.css"

export const Modal = ({onClose}) => {

   
   
  return (
    <div className='modal-container'>

        <div className='modal'>
            <form>
                <div className='formgroup'>
                    <label htmlFor="firmname">Firma Adı:</label>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firmaddress">Address:</label>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firmmail">Mail:</label>
                </div>
                <div className='formgroup'>
                    <label htmlFor="firm-tel">Telefon:</label>
                </div>
                <button className='btn' > Close</button>
            </form>
        </div>
    </div>
  )
}
