import { create } from "zustand";
import { SpinnerTypes } from "../types/types";

interface SpinnerStore {
  state: SpinnerTypes.State;
  setState: (value: SpinnerTypes.State) => void;
}

export const useSpinnerStore = create<SpinnerStore>((set) => ({
  state: { loading: false },
  setState: (value: SpinnerTypes.State) =>
    set({
      state: value,
    }),
}));
