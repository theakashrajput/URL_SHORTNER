import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { checkUserLoggedIn } from "../api/auth.api";

const ProtectedRoute = ({ children }) => {
  const { login, logout } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await checkUserLoggedIn();
        login(res.user);
        setAuthorized(true);
      } catch {
        logout();
        setAuthorized(false);
      } finally {
        setChecked(true);
      }
    };
    check();
  }, []);

  if (!checked) return null;
  return authorized ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
