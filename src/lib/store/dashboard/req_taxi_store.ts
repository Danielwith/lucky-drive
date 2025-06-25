import { RequestTaxiTypes } from "@/lib/types/types";
import { create } from "zustand";

interface ReqTaxiTaskBoardStore {
  reqTaxiData: RequestTaxiTypes.Task[];
  updateReqTaxiData: (newData: RequestTaxiTypes.Task[]) => void;
}

export const useReqTaxiTaskBoardStore = create<ReqTaxiTaskBoardStore>(
  (set) => ({
    reqTaxiData: [],
    updateReqTaxiData: (newData) => {
      set({ reqTaxiData: newData });
    },
  })
);
