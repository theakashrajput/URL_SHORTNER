import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "../utils/axiosInstance";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userUrlData, setUserUrlData] = useState([]);

  useEffect(() => {
    const silentCheck = async () => {
      try {
        const { data } = await axios.get("/api/auth/check", {
          silent: true,
        });
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    silentCheck();
  }, []);

  const login = (user) => setUser(user);

  const logout = () => {
    setUser(null)
    axios.post("/api/auth/logout");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userUrlData,
        login,
        logout,
        setUserUrlData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
