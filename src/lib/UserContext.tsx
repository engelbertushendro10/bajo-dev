'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  username: string;
  avatarUrl: string;
  email: string;
  isPremium: boolean;
}

interface UserContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  setPremium: (status: boolean) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('bajodev_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    const formattedUsername = username.trim().toLowerCase().replace('@', '');
    const dummyUser: User = {
      name: username.includes('@') ? username.split('@')[0] : username,
      username: formattedUsername || 'developer',
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${formattedUsername || 'developer'}`,
      email: `${formattedUsername || 'developer'}@example.com`,
      isPremium: false
    };
    setUser(dummyUser);
    localStorage.setItem('bajodev_user', JSON.stringify(dummyUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bajodev_user');
  };

  const setPremium = (status: boolean) => {
    if (user) {
      const updatedUser = { ...user, isPremium: status };
      setUser(updatedUser);
      localStorage.setItem('bajodev_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setPremium, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
