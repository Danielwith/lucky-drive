import { useEffect } from "react";
import { useNavStore } from "../store/nav_store";
import { fetchNavData } from "@/services/init/nav_data_service";

export const useAutoRefreshNavData = () => {
  const { updateNavData, startAutoRefresh } = useNavStore();

  useEffect(() => {
    // Inicializar data
    const loadInitialData = async () => {
      try {
        const initialData = await fetchNavData();
        updateNavData(initialData);
      } catch (error) {
        console.error("Error loading NAV_DATA:", error);
      }
    };
    loadInitialData();

    // Inicia el intervalo de actualización
    const cleanup = startAutoRefresh();

    return cleanup;
  }, [updateNavData, startAutoRefresh]);
};
