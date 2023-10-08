import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
      localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  const NavToLogin = useNavigate();

  useEffect(() => {
    if (!token) {
      NavToLogin('/');
    }
  }, []);

  return (
      <AuthContext.Provider
          value={{
            token,
            setToken,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};
