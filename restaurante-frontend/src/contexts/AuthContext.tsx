import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setErrorMessage(null);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Falha no login' }));
        throw new Error(errorData.message || 'Falha no login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('userEmail', email);
      setUser({ email });
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Falha no login. Por favor, verifique suas credenciais e tente novamente.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

