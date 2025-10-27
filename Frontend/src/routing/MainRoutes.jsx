import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const MainRoutes = () => {
  return (
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
  );
};

export default MainRoutes;
