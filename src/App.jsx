import { useEffect,useState } from 'react'

import axios from 'axios'
import './App.css'
import { Table } from './components/Table'
import { Modal } from './components/Modal'


function App(){
  const [isOpen, setIsOpen] = useState(false)  

   const handleCloseModal = () => {
        setModalOpen(false);
    }
    const [firmID, setFirmID] = useState("");
    const [info, setInfo] = useState([]);

    const getFirmInfo = () => {
      axios.get("http://localhost:3000/api/firms").then((response) => {
        console.log(response);
        setInfo(response.data);
      }
      );
    };
    useEffect(()=>{
      getFirmInfo();
    },[]);

    const getFirmDetails = () => {
      const res= info.find((firm) => firm.id === firmID)
      console.log(res,firmID);
      return res;

    }

  return <div className='App'>
     <Table setIsOpen={setIsOpen} setFirmID={setFirmID}/>
      
     {isOpen && <Modal onClose={handleCloseModal} firm={getFirmDetails()}/>}


  </div>
}

export default App
