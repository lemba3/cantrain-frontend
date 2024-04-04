import { create } from "zustand";

export const useToastStore = create<{
  isOpen: boolean,
  openToast: () => void,
  closeToast: () => void
}>((set) => ({
  isOpen: false,
  openToast: () => set({ isOpen: true }),
  closeToast: () => set({ isOpen: false }),
}));