import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Декор, полиці, вази, чашки, органайзери та подарунки для дому — усе в наявності.",
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-24">
          <p className="font-display text-3xl text-ink-3">Готуємо каталог…</p>
        </div>
      }
    >
      <CatalogView />
    </Suspense>
  );
}
