import { createBrowserRouter, useParams } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";
import FirmDetail from "../pages/FirmDetail";
import Users from "../pages/Users";
import Firms from "../pages/Firms";

function UserWrapper() {
    const { userId } = useParams();
    return <UserDetail userId={Number(userId)} />;
}

function FirmWrapper() {
    const { firmId } = useParams();
    return <FirmDetail firmId={Number(firmId)} />;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "users/:userId", element: <UserWrapper /> },
            { path: "firms/:firmId", element: <FirmWrapper /> },
            { path: "users", element: <Users /> },
            { path: "firms", element: <Firms /> },
        ],
    },
]);
