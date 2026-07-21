"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => { ok: boolean; error?: string };
  logout: () => void;
  update: (patch: Partial<User>) => void;
};

/** Демо-авторизація: жодного бекенду, все зберігається локально. */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const mail = email.trim().toLowerCase();
        if (!/^\S+@\S+\.\S+$/.test(mail))
          return { ok: false, error: "Введіть коректний email" };
        if (password.length < 4)
          return { ok: false, error: "Пароль має містити щонайменше 4 символи" };
        const isAdmin = mail.startsWith("admin");
        set({
          user: {
            id: "u-" + mail,
            firstName: isAdmin ? "Адміністратор" : "Олена",
            lastName: isAdmin ? "Žoria" : "Ковальчук",
            email: mail,
            phone: "+380 (67) 412-88-01",
            city: "Київ",
            role: isAdmin ? "admin" : "customer",
            createdAt: "2025-11-04",
          },
        });
        return { ok: true };
      },
      register: (data) => {
        const mail = data.email.trim().toLowerCase();
        if (!data.firstName.trim())
          return { ok: false, error: "Вкажіть імʼя" };
        if (!/^\S+@\S+\.\S+$/.test(mail))
          return { ok: false, error: "Введіть коректний email" };
        if (data.password.length < 4)
          return { ok: false, error: "Пароль має містити щонайменше 4 символи" };
        set({
          user: {
            id: "u-" + mail,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: mail,
            phone: data.phone,
            role: mail.startsWith("admin") ? "admin" : "customer",
            createdAt: new Date().toISOString().slice(0, 10),
          },
        });
        return { ok: true };
      },
      logout: () => set({ user: null }),
      update: (patch) =>
        set((s) => ({ user: s.user ? { ...s.user, ...patch } : null })),
    }),
    { name: "zoria-auth", version: 1 },
  ),
);
