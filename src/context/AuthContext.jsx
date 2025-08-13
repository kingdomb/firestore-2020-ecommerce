// firestore:src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

/**
 * Dev-friendly AuthProvider
 * - If a JWT token exists, it is primary.
 * - Otherwise, seeds from `initialUser` for local UI testing.
 */
export function AuthProvider({ children, initialUser = null }) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        setUser(jwtDecode(token));
      } catch {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(initialUser || null);
      } finally {
        setLoading(false);
      }
    } else {
      // no token → use the provided initialUser
      setUser(initialUser || null);
      setLoading(false);
    }
    
  }, [initialUser]);

  async function register({ name, email, password }) {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    localStorage.setItem('token', data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUser(jwtDecode(data.token));
  }

  async function login({ email, password }) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUser(jwtDecode(data.token));
  }

  async function loginWithGoogle(googleToken) {
    const { data } = await api.post('/auth/google', { token: googleToken });
    localStorage.setItem('token', data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUser(jwtDecode(data.token));
  }

  function logout() {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}