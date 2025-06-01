import { useApolloClient, useMutation } from '@apollo/client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LOGIN } from './mutations';

export interface AuthContext {
  isAuthenticated: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  token: string | null;
  error: string;
}

const AuthContext = createContext<AuthContext | null>(null);

const key = 'library.auth.user';

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(token: string | null) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getStoredUser());
  const [error, setError] = useState('');
  const isAuthenticated = !!token;
  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const handleLogout = useCallback(async () => {
    setStoredUser(null);
    setToken(null);
    client.resetStore();
  }, [client]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      login({ variables: { username, password } });
    },
    [login]
  );

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      setStoredUser(token);
    }
  }, [result.data]);

  useEffect(() => {
    setToken(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, handleLogin, handleLogout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
