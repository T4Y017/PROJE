import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { FirmInfoModal } from "../components/firm-info-modal";
import User from "../interfaces/user";
import { UserInfoTable } from "../components/user-info-table";

function Home() {
    const [isFirmModalOpen, setIsOpen] = useState<boolean>(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

    const handleCloseFirmModal = () => {
        setIsOpen(false);
    };
    const handleCloseUserModal = () => {
        setIsUserModalOpen(false);
    };

    const [firmID, setFirmID] = useState<number>();
    const [userID, setUserID] = useState<number>();
    const [employee, setUser] = useState<User[]>([]);

    const getUserInfo = () => {
        axios.get("http://localhost:3000/api/users").then((resp) => {
            console.log(resp);

            setUser(resp.data.users);
        });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="App">
            <UserInfoTable
                setIsOpen={setIsOpen}
                setFirmID={setFirmID}
                setUserID={setUserID}
                emp={employee}
                setIsUserModalOpen={setIsUserModalOpen}
            />
            {isFirmModalOpen && (
                <FirmInfoModal onClose={handleCloseFirmModal} firmId={firmID} />
            )}
        </div>
    );
}

export default Home;
