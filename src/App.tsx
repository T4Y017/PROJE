import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'
import {User_info_table} from "./components/User_info_table"
import Firm from './interfaces/Firm'
import {FirmInfoModal} from './components/firm-info-modal'

function App() {
    const [isFirmModalOpen, setIsOpen] = useState<boolean>(false)

    const handleCloseModal = () => setIsOpen(false);

    const [firmId, setFirmID] = useState<number>();
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
    }, []);

    return (
        <div className='App'>
            <User_info_table setIsOpen={setIsOpen}
                             setFirmID={setFirmID}
                             emp={employee}/>

            {isFirmModalOpen && (
                <FirmInfoModal
                    onClose={handleCloseModal}
                    firmId={firmId}/>
            )}
        </div>
    )
}

export default App
