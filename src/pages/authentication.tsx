import React, { useEffect, useState } from "react";
import "./authentication.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../slice/authSlice";
import { fetchUserData } from "../slice/userSlice";

export const Authentication = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: AppState) => state.user.user?.users || []);
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    );
    useEffect(() => {
        dispatch(fetchUserData({}));
        if (isAuthenticated) {
            navigate("/users");
        }
    }, [isAuthenticated, dispatch]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const foundUser = user.find(
            (u) => u.username === username && u.password === Number(password)
        );
        if (foundUser) {
            dispatch(
                setCredentials({
                    username: foundUser.username,
                    password: foundUser.password,
                    role: foundUser.role,
                    isAuthenticated: true,
                })
            );
            localStorage.setItem("username", foundUser.username);
            localStorage.setItem("password", String(foundUser.password));
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
                        <label htmlFor="username">Kullanıcı Adı:</label>
                        <input
                            type="text"
                            name="username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
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
                        <button type="button">Kaydol</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
