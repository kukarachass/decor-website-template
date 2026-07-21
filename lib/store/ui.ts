"use client";

import { create } from "zustand";

type UIState = {
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  toast: { id: number; title: string; caption?: string } | null;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  notify: (title: string, caption?: string) => void;
  closeToast: () => void;
};

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  menuOpen: false,
  toast: null,
  setCartOpen: (v) => set({ cartOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setMenuOpen: (v) => set({ menuOpen: v }),
  notify: (title, caption) =>
    set({ toast: { id: Date.now(), title, caption } }),
  closeToast: () => set({ toast: null }),
}));
