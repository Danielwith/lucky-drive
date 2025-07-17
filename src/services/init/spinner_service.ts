import { useSpinnerStore } from "@/lib/store/spinner_store";

export const SpinnerService = {
  show: (message = "") => {
    useSpinnerStore.getState().setState({ loading: true, message });
  },
  update: (message: string) => {
    useSpinnerStore.getState().setState({
      message,
      loading: true,
    });
  },
  hide: () => {
    useSpinnerStore.getState().setState({ loading: false, message: "" });
  },
};
