import React, { useEffect, useState } from "react";
import "./authentication.css";
import { replace, useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../slice/authSlice";
import { fetchUserData } from "../slice/userSlice";

export const Authentication = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: AppState) => state.user.user?.users || []);
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    );
    useEffect(() => {
        // İlk temizlik
        const handleToken = async () => {
            await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                credentials: "include", // important to send cookies!
            });
            localStorage.removeItem("accessToken");
            dispatch(logout());
        };
        handleToken();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail, password }),
            credentials: "include",
        });

        const data = await res.json();
        //console.log(data.user, "auth user");
        console.log("PERMISSONs:", data.user.permissions);
        if (res) {
            dispatch(
                setCredentials({
                    mail: data.user.mail,
                    password: data.user.password,
                    role: data.user.role,
                    permissions: data.user.permissions,
                    isAuthenticated: true,
                })
            );
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/users");
        } else {
            alert("Kullanıcı adı veya şifre yanlış");
        }
    };
    return (
        <div className="authentication-container">
            <div className="authentication">
                <h2>Giriş Yap</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Kullanıcı Maili:</label>
                        <input
                            type="text"
                            name="username"
                            required
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Şifre:</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-group-auth">
                        <button type="submit">Giriş Yap</button>
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Kaydol
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
