// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { user, loading } = useAuth();

  if (loading) {
    // spinner here
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}
