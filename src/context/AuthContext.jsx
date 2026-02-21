// firestore:src/context/AuthContext.jsx
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

/**
 * Demo users — no backend required.
 * Exported so the Login page can display credentials.
 */
export const DEMO_USERS = [
  { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' },
  { name: 'John Doe', email: 'john@example.com', password: 'password123' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
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
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  /** Authenticate against the demo user list (no backend needed). */
  function demoLogin({ email, password }) {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new Error('Invalid email or password');
    }
    setUser({ name: found.name, email: found.email });
    return found;
  }

  async function register({ name, email, password }) {
    // Demo mode: skip API call and set user directly
    setUser({ name, email });
  }

  async function login({ email, password }) {
    // Demo mode: skip API call and use demo logic
    demoLogin({ email, password });
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