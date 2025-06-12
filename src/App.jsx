import { useEffect,useState } from 'react'
import axios from 'axios'
import './App.css'
import { User_info_table} from "./components/User_info_table"
import { Firm_info_modal } from "./components/Firm_info_modal"
function App(){
  const [isFirmModalOpen, setIsOpen] = useState(false)  

   const handleCloseModal = () => {
        setModalOpen(false);
    }
    const [firmID, setFirmID] = useState("");
    const [info, setInfo] = useState([]);
    const [employee, setUser] = useState([]);
  

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

  return (<div className='App'>
     <User_info_table setIsOpen={setIsOpen} setFirmID={setFirmID} emp={employee} />
      
     {isFirmModalOpen && <Firm_info_modal onClose={handleCloseModal} firmRequest={getFirmDetails}/>}
    </div>)
}

export default App
