import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== checkPassword) {
            setError("Şifreler eşleşmiyor!");
            return;
        }
        const res = await fetch(
            "http://expressjs-production-88cc.up.railway.app/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    surname,
                    mail,
                    password,
                    role,
                }),
            }
        );
        await res.json();
        alert("Kayıt başarılı!");
        navigate("/");
    };

    return (
        <div className="register-container">
            <div className="btn-place">
                <button
                    className="btn"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowBackIcon />
                </button>
            </div>
            <div className="register-form">
                <h2>Kayıt Ol</h2>
                {error && <div className="error">{error}</div>}
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
                        <label htmlFor="username">Kullanıcı Soyadı:</label>
                        <input
                            type="text"
                            name="surname"
                            required
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Kullanıcı Maili:</label>
                        <input
                            type="text"
                            name="mail"
                            required
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Rol Seçin...</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="gözlemci">Gözlemci</option>
                        </select>
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
                    <div className="input-group">
                        <label htmlFor="password">Şifre Tekrar:</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={(e) => setCheckPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <button type="submit">Kaydol</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
