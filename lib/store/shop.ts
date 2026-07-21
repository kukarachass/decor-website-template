"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderStatus, Product } from "@/lib/types";
import { products as seedProducts } from "@/lib/data/products";
import { mockOrders } from "@/lib/data/orders";

type ShopState = {
  products: Product[];
  orders: Order[];
  addProduct: (p: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: Order) => void;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  resetDemo: () => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      products: seedProducts,
      orders: mockOrders,
      addProduct: (p) => set((s) => ({ products: [p, ...s.products] })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      setOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      resetDemo: () => set({ products: seedProducts, orders: mockOrders }),
    }),
    { name: "zoria-shop", version: 2 },
  ),
);
