import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/spinner";

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );
    const token = localStorage.getItem("accessToken");
    const authReady = useSelector((state: any) => state.auth.authReady);
    if (!authReady) {
        return <Spinner />;
    }
    if (!isAuthenticated || !token) return <Navigate to="/" replace />;
    else {
        return <Outlet />;
    }
};
export default ProtectedRoutes;
