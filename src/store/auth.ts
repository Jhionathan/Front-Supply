import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean; // <- flag interna
  setToken: (token: string) => void;
  logout: () => void;
  setHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setToken: (token: string) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false }),
      setHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
          if (state.token) {
            state.isAuthenticated = true;
          }
        }
      },
    }
  )
);