import { create } from "zustand";


type AuthState = {
    token: string | null;
    setToken: (t: string | null) => void;
    logout: () => void;
  };
  
  export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: (t) => {
      if (t) localStorage.setItem("access_token", t);
      else localStorage.removeItem("access_token");
      set({ token: t });
    },
    logout: () => {
      localStorage.removeItem("access_token");
      set({ token: null });
    },
  }));