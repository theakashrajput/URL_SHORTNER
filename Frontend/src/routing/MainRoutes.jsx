import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Nav from "../components/Nav";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MainRoutes = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return null;
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default MainRoutes;
