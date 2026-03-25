import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false, // mock auth state
  user: null,
  githubToken: null,
  login: () => set({ isAuthenticated: true, user: { name: 'Demo User' } }),
  logout: () => set({ isAuthenticated: false, user: null, githubToken: null }),
  setGithubToken: (token) => set({ githubToken: token }),
}));
