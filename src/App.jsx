import { useState } from 'react'

import axios from 'axios'
import './App.css'
import { Table } from './components/Table'
import { Modal } from './components/Modal'


function App(){
  const [isOpen, setIsOpen] = useState(false)  

   const handleCloseModal = () => {
        setModalOpen(false);
    }

  return <div className='App'>
     <Table setIsOpen={setIsOpen} />
      
     {isOpen && <Modal onClose={handleCloseModal}/>}


  </div>
}

export default App
