'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'ehsCyberAdmin';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  loading: false,
  login: async () => ({ ok: false }),
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') {
        setIsAdmin(true);
      }
    } catch {}
  }, []);

  const login = async (password: string): Promise<{ ok: boolean; error?: string }> => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        setIsAdmin(true);
        try { window.localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
        return { ok: true };
      }
      return { ok: false, error: data.error ?? 'Incorrect password.' };
    } catch {
      return { ok: false, error: 'Network error. Try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAdmin(false);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  if (!mounted) {
    return (
      <AuthContext.Provider value={{ isAdmin: false, loading, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);