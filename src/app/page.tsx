"use client";
import { create } from "zustand";
import Toast from "./components/Toast";
import { useEffect, useRef } from "react";

type Props = {
  searchParams?: Record<"noti", string>;
};

export default function Home(props: Props) {

  const { isOpen, openToast, closeToast } = useToastStore();
  const toastBtnRef = useRef<HTMLButtonElement>(null);

  // show toast on account creation from search param
  useEffect(() => {
      if(props.searchParams?.noti) {
        // click the toast-btn
        toastBtnRef.current?.click();
        clearSearchParams();
      }
    },[]
  );

  const clearSearchParams = () => {
    window.history.pushState({}, document.title, window.location.pathname);
  };

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   Hello there
    // </main>
    <div>
      <button ref={toastBtnRef} onClick={openToast} className="hidden">Show Toast</button>
      <Toast message="Account successfully created"/>
      Hello there this is your Homepage
    </div>
  );
}

export const useToastStore = create<{
  isOpen: boolean,
  openToast: () => void,
  closeToast: () => void
}>((set) => ({
  isOpen: false,
  openToast: () => set({ isOpen: true }),
  closeToast: () => set({ isOpen: false }),
}));
