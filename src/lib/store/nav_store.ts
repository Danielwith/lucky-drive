import { create } from 'zustand';
import { NavInfoData } from '../types/types';
import { fetchNavData } from '@/services/init/nav_data_service';

const NAV_REFRESH_SECONDS = 15;

type NavStore = {
  navData: NavInfoData[];
  updateNavData: (newData: NavInfoData[]) => void;
  startAutoRefresh: () => void;
};

export const useNavStore = create<NavStore>((set) => ({
  navData: [],
  updateNavData: (newData) => set({ navData: newData }),
  startAutoRefresh: () => {
    const intervalId = setInterval(async () => {
      const newData = await fetchNavData();
      set({ navData: newData });
    }, NAV_REFRESH_SECONDS * 1000);

    return () => clearInterval(intervalId);
  },
}));