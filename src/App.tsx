import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "./store/Store";

function App() {
    return (
        <Provider store={store}>
            <Outlet />
        </Provider>
    );
}

export default App;
