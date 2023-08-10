import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [local, setLocal] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
