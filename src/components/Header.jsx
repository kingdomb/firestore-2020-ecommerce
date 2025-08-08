import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <a href='/login'>Log in</a>
      )}
    </header>
  );
}
