import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    setUser(res.user);
    api.setToken(res.token);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await api.post("/signup", { name, email, password });
    setUser(res.user);
    api.setToken(res.token);
  };

  const logout = () => {
    setUser(null);
    api.setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
