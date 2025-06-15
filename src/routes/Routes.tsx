import { createBrowserRouter, useParams } from "react-router";
import App from "../App";
import { UserInfoModal } from "../components/user-info-modal";
import { FirmInfoModal } from "../components/firm-info-modal";
import Users from "../pages/Users";
import Firms from "../pages/Firms";
import Home from "../pages/Home";





function FirmWrapper()  {
  
    const { firmId } = useParams();
    return <Firms firmId={Number(firmId)} />
  
}
function UserWrapper() {
    const { userId}= useParams();
    return <Users userId={Number(userId)} />
}



export const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {   index:true,
                element: <Home />
            },  
            {path: "firms/:firmId" ,element: <FirmWrapper/>},
            {path: 'users/:userId' ,element: <UserWrapper  />},
        ] ,
    },
]);