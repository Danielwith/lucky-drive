import { create } from "zustand";
import { fetchNavData } from "@/services/init/nav_data_service";
import { NavigationTypes } from "../types/types";

const NAV_REFRESH_SECONDS = 15;

interface NavStore {
  navData: NavigationTypes.NavInfoData[];
  updateNavData: (newData: NavigationTypes.NavInfoData[]) => void;
  startAutoRefresh: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  navData: [],
  updateNavData: (newData) => {
    set({ navData: newData });
  },
  startAutoRefresh: () => {
    const intervalId = setInterval(async () => {
      const newData = await fetchNavData();
      set({ navData: newData });
    }, NAV_REFRESH_SECONDS * 1000);

    return () => clearInterval(intervalId);
  },
}));
