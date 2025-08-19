import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,

  // Встановити користувача після успішного логіну
  setUser: (user: User) =>
    set(() => ({
      user,
      isAuthenticated: true,
    })),

  // Очистити стан при виході
  clearAuth: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
    })),
}));
