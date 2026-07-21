"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/store/cart";
import { useShop } from "@/lib/store/shop";
import { promoCodes } from "@/lib/data/delivery";
import type { Product } from "@/lib/types";

/** true після монтування — щоб не було розбіжностей SSR / localStorage. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export type ResolvedLine = {
  product: Product;
  qty: number;
  color: string;
};

export function useCartDetails() {
  const lines = useCart((s) => s.lines);
  const promo = useCart((s) => s.promo);
  const products = useShop((s) => s.products);

  return useMemo(() => {
    const resolved: ResolvedLine[] = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        return product ? { product, qty: l.qty, color: l.color } : null;
      })
      .filter(Boolean) as ResolvedLine[];

    const count = resolved.reduce((s, l) => s + l.qty, 0);
    const subtotal = resolved.reduce((s, l) => s + l.product.price * l.qty, 0);
    const promoData = promo ? promoCodes[promo] : undefined;
    const discount = promoData ? Math.round(subtotal * promoData.discount) : 0;

    return {
      lines: resolved,
      count,
      subtotal,
      discount,
      promo,
      promoLabel: promoData?.label,
      total: subtotal - discount,
    };
  }, [lines, products, promo]);
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/** Блокує скрол сторінки, поки відкрито оверлей. */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
