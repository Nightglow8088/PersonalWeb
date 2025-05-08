import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({ token: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // 首次挂载时，从 localStorage 里恢复 token
  useEffect(() => {
    const t = localStorage.getItem('jwt');
    if (t) setToken(t);
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwt', newToken);
  };

  const logout = async () => {
    // 调用后端登出（可选）
    await fetch('/api/auth/logout', { method: 'POST' });
    setToken(null);
    localStorage.removeItem('jwt');
  };


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
