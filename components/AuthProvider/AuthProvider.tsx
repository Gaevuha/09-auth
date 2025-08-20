'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';
import Loader from '@/app/loading';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const user = await checkSession();
        if (user) setUser(user);
        else clearIsAuthenticated();
      } catch {
        clearIsAuthenticated();
      } finally {
        setChecking(false);
      }
    };
    verify();
  }, [setUser, clearIsAuthenticated]);

  if (checking) return <Loader />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
