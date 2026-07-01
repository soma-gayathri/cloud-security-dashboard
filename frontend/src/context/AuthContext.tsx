import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { loginUser } from "../services/api";

type User = {
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  const [token, setToken] = useState<string | null>(savedToken);
  const [user, setUser] = useState<User | null>(
    savedUser ? JSON.parse(savedUser) : null
  );

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
