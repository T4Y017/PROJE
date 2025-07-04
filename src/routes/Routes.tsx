import { createBrowserRouter, useParams } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";
import FirmDetail from "../pages/FirmDetail";
import Users from "../pages/Users";
import Firms from "../pages/Firms";
import { Authentication } from "../pages/authentication";
import ProtectedRoutes from "./ProtectedRoutes";
import { Register } from "../pages/register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCredentials, setAuthReady } from "../slice/authSlice";
import { AppDispatch } from "../store/Store";
import { AuthLayout } from "../pages/AuthLayout";

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
            { index: true, element: <Authentication /> },
            { path: "register", element: <Register /> },
            {
                element: <AuthLayout />,
                children: [
                    {
                        element: <ProtectedRoutes />,
                        children: [
                            { path: "home", element: <Home /> },
                            { path: "users/:userId", element: <UserWrapper /> },
                            { path: "firms/:firmId", element: <FirmWrapper /> },
                            { path: "users", element: <Users /> },
                            { path: "firms", element: <Firms /> },
                        ],
                    },
                ],
            },
        ],
    },
]);
