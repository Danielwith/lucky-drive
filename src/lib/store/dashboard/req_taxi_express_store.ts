import { RequestTaxiExpressTypes } from "@/lib/types/types";
import { create } from "zustand";

interface ReqTaxiExpressTaskBoardStore {
  reqTaxiExpressData: RequestTaxiExpressTypes.Task[];
  updateReqTaxiExpressData: (newData: RequestTaxiExpressTypes.Task[]) => void;
}

export const useReqTaxiExpressTaskBoardStore =
  create<ReqTaxiExpressTaskBoardStore>((set) => ({
    reqTaxiExpressData: [],
    updateReqTaxiExpressData: (newData) => {
      set({ reqTaxiExpressData: newData });
    },
  }));
