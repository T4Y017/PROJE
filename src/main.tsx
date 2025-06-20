import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/Routes";

createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router}/>
);
