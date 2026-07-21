"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { uk, type Dict } from "@/lib/i18n/uk";
import { en } from "@/lib/i18n/en";
import { productsEn, specToEn } from "@/lib/i18n/products.en";
import type { Product } from "@/lib/types";

export type Locale = "uk" | "en";

const dicts: Record<Locale, Dict> = { uk, en };
const STORAGE_KEY = "zoria-locale";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const I18nContext = createContext<Ctx>({ locale: "uk", setLocale: () => {}, t: uk });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uk");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "uk" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: dicts[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Словник поточної мови. */
export function useT(): Dict {
  return useContext(I18nContext).t;
}

export function useLocale(): Locale {
  return useContext(I18nContext).locale;
}

/** Локалізована картка товару (для доданих в адмінці — оригінал). */
export function useLocalizedProduct(product: Product): Product {
  const locale = useLocale();
  return useMemo(() => {
    if (locale !== "en") return product;
    const tr = productsEn[product.id];
    if (!tr) return product;
    return {
      ...product,
      name: tr.name,
      subtitle: tr.subtitle,
      description: tr.description,
      features: tr.features,
      sizes: tr.sizes ?? product.sizes,
      specs: product.specs.map(specToEn),
    };
  }, [product, locale]);
}

export function useLocalizeProducts() {
  const locale = useLocale();
  return useCallback(
    (list: Product[]) => {
      if (locale !== "en") return list;
      return list.map((product) => {
        const tr = productsEn[product.id];
        if (!tr) return product;
        return {
          ...product,
          name: tr.name,
          subtitle: tr.subtitle,
          description: tr.description,
          features: tr.features,
          sizes: tr.sizes ?? product.sizes,
          specs: product.specs.map(specToEn),
        };
      });
    },
    [locale],
  );
}

/** Назва кольору поточною мовою. */
export function useColorName() {
  const t = useT();
  return useCallback(
    (name: string) =>
      name
        .split(" · ")
        .map((part) => t.colors[part] ?? part)
        .join(" · "),
    [t],
  );
}

const monthsUk = [
  "січня", "лютого", "березня", "квітня", "травня", "червня",
  "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
];
const monthsEn = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function useDateFormat() {
  const locale = useLocale();
  return useCallback(
    (iso: string) => {
      const d = new Date(iso);
      return locale === "en"
        ? `${monthsEn[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        : `${d.getDate()} ${monthsUk[d.getMonth()]} ${d.getFullYear()}`;
    },
    [locale],
  );
}

/** Відмінювання: uk — три форми, en — однина/множина. */
export function usePlural() {
  const locale = useLocale();
  return useCallback(
    (n: number, forms: [string, string, string]) => {
      if (locale === "en") return n === 1 ? forms[0] : forms[1];
      const abs = Math.abs(n) % 100;
      const last = abs % 10;
      if (abs > 10 && abs < 20) return forms[2];
      if (last > 1 && last < 5) return forms[1];
      if (last === 1) return forms[0];
      return forms[2];
    },
    [locale],
  );
}
