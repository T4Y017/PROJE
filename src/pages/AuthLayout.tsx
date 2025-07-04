import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCredentials, setAuthReady } from "../slice/authSlice";
import { AppDispatch } from "../store/Store";

type Props = {};

export const AuthLayout = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        console.log("Authentication component mounted");
        const tryRefreshToken = async () => {
            try {
                // Always attempt to refresh the session
                const res = await fetch(
                    "http://localhost:3000/api/refresh-token",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                if (res.ok) {
                    const data = await res.json();

                    localStorage.setItem("accessToken", data.accessToken);

                    dispatch(
                        setCredentials({
                            mail: data.user.mail,
                            role: data.user.role,
                            isAuthenticated: true,
                        })
                    );
                } else {
                    console.log("Session expired");
                    localStorage.removeItem("accessToken");
                }
            } catch (err) {
                console.error("Refresh token failed:", err);
                localStorage.removeItem("accessToken");
            } finally {
                dispatch(setAuthReady(true));
            }
        };

        tryRefreshToken();
    }, [dispatch]);
    return <Outlet />;
};
