import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { checkUserLoggedIn } from "../api/auth.api";

const ProtectedRoute = ({ children }) => {
  const { user, loading, setUser, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await checkUserLoggedIn();
        console.log(res);
        setUser(res.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
