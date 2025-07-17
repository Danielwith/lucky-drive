import { create } from "zustand";
import { parseJwt } from "../utils";
import { LoginTypes } from "../types/types";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user_data: LoginTypes.Usuario;
  login: (token: string, user_data: any) => void;
  logout: () => void;
}

// TIMER DE VERIFICACION DEL TOKEN
const TIMER = 60 * 1000; // 1 MINUTO

export const useAuthStore = create<AuthState>((set, get) => {
  const storedToken = localStorage.getItem("token");
  const storedUserData = JSON.parse(localStorage.getItem("user_data") ?? "");
  const initialLoggedIn =
    localStorage.getItem("auth") === "true" && !!storedToken;

  // función para comprobar expiración
  const checkExpiry = () => {
    const token = get().token;
    if (!token) return get().logout();
    const payload = parseJwt<{ exp: number }>(token);
    if (!payload?.exp) return get().logout();
    const now = Date.now() / 1000;
    if (payload.exp < now) {
      get().logout();
    }
  };

  // arrancar timer si está logueado
  if (initialLoggedIn) {
    setInterval(checkExpiry, TIMER);
  }

  return {
    isLoggedIn: initialLoggedIn,
    token: storedToken,
    user_data: storedUserData,
    login: (token, user_data) => {
      localStorage.setItem("auth", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("user_data", JSON.stringify(user_data));
      set({ isLoggedIn: true, token });
    },
    logout: () => {
      localStorage.setItem("auth", "false");
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      set({ isLoggedIn: false, token: null });
    },
  };
});
