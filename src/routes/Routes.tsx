import { createBrowserRouter, useParams } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";

function UserWrapper() {
    const { userId } = useParams();
    return <UserDetail userId={Number(userId)} />;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "users/:userId", element: <UserWrapper /> },
        ],
    },
]);
