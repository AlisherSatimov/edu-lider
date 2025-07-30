import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole, USER_ROLES } from "./constants";

interface AuthState {
  userRole: UserRole | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userRole: null,
      isAuthenticated: false,
      isHydrated: false,
      login: (role: UserRole) => set({ userRole: role, isAuthenticated: true }),
      logout: () => set({ userRole: null, isAuthenticated: false }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
