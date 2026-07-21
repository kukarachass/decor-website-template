"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { useUI } from "@/lib/store/ui";
import { categories } from "@/lib/data/categories";
import { useLocalizeProducts, useT } from "@/lib/i18n";
import { cn, formatPrice } from "@/lib/utils";
import { Input, Select } from "@/components/ui/Field";
import { ProductArt } from "@/components/ui/ProductArt";
import { TagBadge } from "@/components/ui/Badge";

export default function AdminProducts() {
  const t = useT();
  const localize = useLocalizeProducts();
  const products = localize(useShop((s) => s.products));
  const deleteProduct = useShop((s) => s.deleteProduct);
  const resetDemo = useShop((s) => s.resetDemo);
  const notify = useUI((s) => s.notify);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
      );
    });
  }, [products, query, category]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">{t.admin.nav.products}</p>
          <h1 className="font-display text-[2.2rem] leading-none sm:text-[2.8rem]">
            {t.admin.productsTitle}
          </h1>
          <p className="mt-3 text-sm text-ink-2">
            {products.length} {t.admin.productsText}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              resetDemo();
              notify(t.admin.resetDone);
            }}
            className="cursor-pointer rounded-full border border-ink/12 px-4 py-2.5 text-[0.78rem] text-ink-2 transition-colors hover:border-ink/35"
          >
            {t.admin.resetDemo}
          </button>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.8rem] text-paper transition-colors hover:bg-ink-2"
          >
            <Plus className="h-4 w-4" />
            {t.admin.addProduct}
          </Link>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.admin.searchProducts}
            className="pl-11"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-56"
        >
          <option value="">{t.admin.allCategories}</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {t.categories[c.slug].title}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-line bg-paper">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead>
              <tr className="bg-sand/40 text-[0.68rem] tracking-[0.14em] text-ink-3 uppercase">
                <th className="px-6 py-4 font-normal">{t.admin.table.product}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.category}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.price}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.stock}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.tags}</th>
                <th className="px-6 py-4 text-right font-normal">{t.admin.table.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ProductArt
                        category={p.category}
                        seed={p.id}
                        className="h-14 w-12 shrink-0 rounded-xl"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/product/${p.slug}`}
                          className="block truncate hover:text-clay-2"
                        >
                          {p.name}
                        </Link>
                        <span className="block truncate text-[0.7rem] text-ink-3">
                          {p.subtitle}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-2">
                    {t.categories[p.category]?.title}
                  </td>
                  <td className="px-6 py-4">
                    {formatPrice(p.price)}
                    {p.oldPrice && (
                      <span className="ml-2 text-[0.72rem] text-ink-3 line-through">
                        {formatPrice(p.oldPrice)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.7rem]",
                        p.stock <= 5
                          ? "bg-[#f2e2e2] text-[#9c5c5c]"
                          : p.stock <= 12
                            ? "bg-sand-2 text-ink-2"
                            : "bg-[#e4efe2] text-[#4d6b48]",
                      )}
                    >
                      {p.stock} {t.common.pcs}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/products/new?id=${p.id}`}
                        aria-label={t.admin.editProduct}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-sand"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label={t.admin.delete}
                        onClick={() => setConfirm(p.id)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-[#f2e2e2] hover:text-[#9c5c5c]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="px-6 py-16 text-center text-sm text-ink-3">
            {t.admin.nothingFound}
          </p>
        )}
      </div>

      {/* підтвердження видалення */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
            onClick={() => setConfirm(null)}
          />
          <div className="relative w-full max-w-sm rounded-[26px] border border-line bg-paper p-7 text-center">
            <p className="font-display text-2xl">{t.admin.deleteTitle}</p>
            <p className="mt-3 text-sm text-ink-2">
              {products.find((p) => p.id === confirm)?.name} {t.admin.deleteText}
            </p>
            <div className="mt-7 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="flex-1 cursor-pointer rounded-full border border-ink/15 py-3 text-[0.8rem] transition-colors hover:border-ink/40"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(confirm);
                  setConfirm(null);
                  notify(t.admin.deleted);
                }}
                className="flex-1 cursor-pointer rounded-full bg-[#b06a6a] py-3 text-[0.8rem] text-paper transition-opacity hover:opacity-90"
              >
                {t.admin.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
