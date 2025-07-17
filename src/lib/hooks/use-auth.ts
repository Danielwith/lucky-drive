import { useEffect } from "react";
import { useAuthStore } from "../store/auth_store";

export function useAuth() {
  const { isLoggedIn, login, logout } = useAuthStore();

  useEffect(() => {
    const onStorage = () => {
      const authFlag = localStorage.getItem("auth") === "true";
      const token = localStorage.getItem("token");
      const user_data = localStorage.getItem("user_data");
      if (!authFlag || !token || !user_data) logout();
      else login(token, user_data);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [login, logout]);

  return {
    isLoggedIn,
    login: useAuthStore.getState().login,
    logout: useAuthStore.getState().logout,
  };
}
