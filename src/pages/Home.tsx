import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <button className="btn" onClick={() => navigate("/users")}>
                Kullanıcıları Göster
            </button>
            <button className="btn" onClick={() => navigate("/firms")}>
                Firmaları Göster
            </button>
        </div>
    );
}

export default Home;
