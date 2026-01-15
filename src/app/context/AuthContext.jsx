'use client';

import { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  
  const isLoggedIn = !!session;
  const loading = status === 'loading';

  const login = async (provider, credentials) => {
    if (provider === 'credentials') {
      return await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
    } else {
      return await signIn(provider);
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  const value = {
    isLoggedIn,
    loading,
    user: session?.user,
    login,
    logout,
    session
  };

  return (
    <AuthContext.Provider value={value}>
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