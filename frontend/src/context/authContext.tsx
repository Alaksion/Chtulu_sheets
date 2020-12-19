import React, { useState, useCallback, createContext, useContext } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  setUserData(loginData: AuthState): void;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const appStorage = '@ctulu';

  const [data, setData] = useState<AuthState>(() => {
    const fetchToken = localStorage.getItem(`${appStorage}:token`);
    const fetchUser = localStorage.getItem(`${appStorage}:user`);

    if (fetchToken && fetchUser) {
      return { token: fetchToken, user: JSON.parse(fetchUser) };
    }
    return {} as AuthState;
  });

  const setUserData = useCallback(({ token, user }: AuthState) => {
    localStorage.setItem(`${appStorage}:token`, token);
    localStorage.setItem(`${appStorage}:user`, JSON.stringify(user));
    setData({ token, user });
  }, []);

  return (
    <authContext.Provider value={{ user: data.user, setUserData }}>
      {children}
    </authContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth só pode ser usado dentro de um AuthProvidr');
  }
  return context;
}

export { useAuth, AuthProvider };
