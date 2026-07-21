"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/lib/types";
import { promoCodes } from "@/lib/data/delivery";

type CartState = {
  lines: CartLine[];
  promo: string | null;
  add: (productId: string, color: string, qty?: number) => void;
  remove: (productId: string, color: string) => void;
  setQty: (productId: string, color: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
};

const same = (l: CartLine, id: string, color: string) =>
  l.productId === id && l.color === color;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      promo: null,
      add: (productId, color, qty = 1) =>
        set((s) => {
          const exists = s.lines.find((l) => same(l, productId, color));
          if (exists) {
            return {
              lines: s.lines.map((l) =>
                same(l, productId, color) ? { ...l, qty: l.qty + qty } : l,
              ),
            };
          }
          return { lines: [...s.lines, { productId, color, qty }] };
        }),
      remove: (productId, color) =>
        set((s) => ({ lines: s.lines.filter((l) => !same(l, productId, color)) })),
      setQty: (productId, color, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (same(l, productId, color) ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [], promo: null }),
      applyPromo: (code) => {
        const key = code.trim().toUpperCase();
        if (promoCodes[key]) {
          set({ promo: key });
          return true;
        }
        return false;
      },
      removePromo: () => set({ promo: null }),
    }),
    { name: "zoria-cart", version: 1 },
  ),
);
