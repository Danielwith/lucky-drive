import { create } from "zustand";
import { RequestReceptionTypes } from "../../types/types";

interface ReqReceptionStore {
  reqReceptionData: RequestReceptionTypes.Payment[];
  updateReqReceptionData: (newData: RequestReceptionTypes.Payment[]) => void;
}

export const useReqReceptionStore = create<ReqReceptionStore>((set) => ({
  reqReceptionData: [],
  updateReqReceptionData: (newData) => {
    set({ reqReceptionData: newData });
  },
}));
