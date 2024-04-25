import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from './lib/appwrite';
import axios from 'axios';

// Tạo context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((response) => {
        if (response) {
            setIsLoggedIn(true);
            setUser(response);
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  });

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook để sử dụng context
export function useAuth() {
  return useContext(AuthContext);
}
