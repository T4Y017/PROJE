import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoutes;
