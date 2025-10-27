import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import MainRoutes from "./routing/MainRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
    <Nav />
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
  </AuthProvider>
);
