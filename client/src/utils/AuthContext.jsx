import { createContext, useState, useContext, useEffect } from "react";
import { decodeToken, getToken } from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = getToken();
    console.log(accessToken);

    if (accessToken) {
      setUser(decodeToken(accessToken));
    }
  }, []);
  console.log(user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
