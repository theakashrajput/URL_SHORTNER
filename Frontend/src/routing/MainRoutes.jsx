import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AuthPage from "../pages/AuthPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default MainRoutes;
