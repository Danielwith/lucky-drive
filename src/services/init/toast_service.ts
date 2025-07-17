import { Slide, toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2100,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  rtl: false,
  transition: Slide,
  closeButton: false,
};

export const ToastService = {
  toast: (message: string, options?: ToastOptions) => {
    toast(message, { ...defaultOptions, ...options });
  },
};
