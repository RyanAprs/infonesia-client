import { createContext, useContext, useEffect } from "react";
import UseAuthManager from "../store/AuthProvider";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = UseAuthManager();

  useEffect(() => {
    const validateAuth = async () => {
      await auth.checkAuth();
    };

    validateAuth();
  }, [auth]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
