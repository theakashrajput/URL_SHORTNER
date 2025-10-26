import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import MainRoutes from "./routing/MainRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <Nav />
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </BrowserRouter>
  </>
);
