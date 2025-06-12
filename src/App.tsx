import { useEffect,useState } from 'react'
import axios from 'axios'
import './App.css'
import { User_info_table} from "./components/User_info_table"
import { Firm_info_modal } from "./components/Firm_info_modal"
function App(){
  const [isFirmModalOpen, setIsOpen] = useState<boolean>(false)  

    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const [firmID, setFirmID] = useState<number>();
    interface Firm {
      id:number;
      firmName:string;
      firmMail:string;
      address:string;
      tel:string;
    }
    interface User {
      id:number;
      username:string;
      surname:string;
      mail:string;
      tel:string;
      firmName:string;
    }
    const [info, setInfo] = useState<User[]>([]);
    const [employee, setUser] = useState<Firm[]>([]);
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
