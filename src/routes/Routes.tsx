import { createBrowserRouter, useParams } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";
import FirmDetail from "../pages/FirmDetail";

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
        ],
    },
]);
