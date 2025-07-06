import type { User } from '../../../shared/types/user';
import { create } from 'zustand';

interface AuthState extends User {
  isAuthenticated: boolean;
  setAuth: (auth: { userId: string; email: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: '',
  email: '',
  username: '',

  setAuth: ({ userId, email, username }) =>
    set({
      isAuthenticated: true,
      userId,
      email,
      username
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      userId: '',
      email: '',
      username: ''
    })
}));