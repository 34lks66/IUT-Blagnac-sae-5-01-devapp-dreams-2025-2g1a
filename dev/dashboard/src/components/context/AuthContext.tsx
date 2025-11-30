import { createContext, useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface User {
  _id: string;
  email: string;
  role: "S" | "X" | "O";
}

interface AuthContextType {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiFetch("/api/me", {
          method: "GET",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
