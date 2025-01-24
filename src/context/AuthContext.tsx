import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedTokenPayload extends JwtPayload {
  email?: string;
  uid?: string;
}

interface AuthContextType {
  user: DecodedTokenPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedTokenPayload | null>(null);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<DecodedTokenPayload>(token);

      if (decoded.exp && decoded.exp > Math.floor(Date.now() / 1000)) {
        setUser(decoded);
      } else {
        localStorage.removeItem('token');
        setUser(null);
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login');
        }
      }
    } else if (location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  const login = (token: string) => {
    const decoded = jwtDecode<DecodedTokenPayload>(token);

    if (decoded.exp && decoded.exp > Math.floor(Date.now() / 1000)) {
      localStorage.setItem('token', token);
      setUser(decoded);
      navigate('/characters');
    } else {
      console.error('Invalid or expired token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
