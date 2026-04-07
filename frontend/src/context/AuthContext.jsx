import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  signupRequest,
  getMeRequest,
} from "../services/authService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("mydayAuth");
    return stored ? JSON.parse(stored) : { user: null, token: null };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      if (!auth.token) {
        setLoading(false);
        return;
      }

      try {
        const user = await getMeRequest();

        const updatedAuth = {
          user,
          token: auth.token,
        };

        setAuth(updatedAuth);
        localStorage.setItem("mydayAuth", JSON.stringify(updatedAuth));
      } catch (error) {
        localStorage.removeItem("mydayAuth");
        setAuth({ user: null, token: null });
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, []);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);

    const newAuth = {
      user: data.user,
      token: data.token,
    };

    setAuth(newAuth);
    localStorage.setItem("mydayAuth", JSON.stringify(newAuth));

    return data;
  };

  const signup = async (userData) => {
    const data = await signupRequest(userData);

    const newAuth = {
      user: data.user,
      token: data.token,
    };

    setAuth(newAuth);
    localStorage.setItem("mydayAuth", JSON.stringify(newAuth));

    return data;
  };

  const logout = () => {
    localStorage.removeItem("mydayAuth");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        isAuthenticated: !!auth.token,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
