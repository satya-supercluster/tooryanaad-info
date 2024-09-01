import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [passcode, setPasscode] = useState("");
  useEffect(() => {
    if (passcode === `${import.meta.env.VITE_SECRET}`) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [passcode]);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        passcode,
        setPasscode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
