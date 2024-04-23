import React, { createContext, useContext, useState } from 'react';

// Tạo context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Đăng nhập
  const login = () => {
    setIsLoggedIn(true);
  };

  // Đăng xuất
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook để sử dụng context
export function useAuth() {
  return useContext(AuthContext);
}
