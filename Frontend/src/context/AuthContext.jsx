import { useEffect, useState } from "react";
import { createContext } from "react";
import { checkUserLoggedIn } from "../api/auth.api";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
