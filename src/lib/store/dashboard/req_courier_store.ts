import { RequestCourierTypes } from "@/lib/types/types";
import { create } from "zustand";

interface ReqCourierTaskBoardStore {
  reqCourierData: RequestCourierTypes.Task[];
  updateReqCourierData: (newData: RequestCourierTypes.Task[]) => void;
}

export const useReqCourierTaskBoardStore = create<ReqCourierTaskBoardStore>(
  (set) => ({
    reqCourierData: [],
    updateReqCourierData: (newData) => {
      set({ reqCourierData: newData });
    },
  })
);
