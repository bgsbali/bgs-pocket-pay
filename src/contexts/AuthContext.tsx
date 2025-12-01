import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Customer, AuthUser } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: Customer | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedAuth = localStorage.getItem('bgs_auth');
    if (storedAuth) {
      try {
        const { token, customer } = JSON.parse(storedAuth) as AuthUser;
        setToken(token);
        setUser(customer);
      } catch (error) {
        console.error('Failed to parse stored auth:', error);
        localStorage.removeItem('bgs_auth');
      }
    }
    setIsLoading(false);

    // Auto logout after 30 minutes of inactivity
    let inactivityTimer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (user) {
          logout();
        }
      }, 30 * 60 * 1000); // 30 minutes
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    const authData = await authService.login(email, password);
    setToken(authData.token);
    setUser(authData.customer);
    localStorage.setItem('bgs_auth', JSON.stringify(authData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('bgs_auth');
  };

  const updateProfile = async (data: Partial<Customer>) => {
    if (!user || !token) return;
    const updated = await authService.updateProfile(token, data);
    setUser(updated);
    const storedAuth = localStorage.getItem('bgs_auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      localStorage.setItem('bgs_auth', JSON.stringify({ ...parsed, customer: updated }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
