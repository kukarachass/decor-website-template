"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useShop } from "@/lib/store/shop";
import { useCartDetails, useHydrated } from "@/lib/hooks";
import { cn, formatPrice, plural } from "@/lib/utils";
import { FREE_SHIPPING_FROM } from "@/lib/data/delivery";
import { ProductArt } from "@/components/ui/ProductArt";
import { QtyInput } from "@/components/ui/QtyInput";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { ProductRail } from "@/components/product/ProductRail";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categoryMap } from "@/lib/data/categories";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useColorName, usePlural, useT } from "@/lib/i18n";

export default function CartPage() {
  const t = useT();
  const plural = usePlural();
  const colorName = useColorName();
  const hydrated = useHydrated();
  const { lines, count, subtotal, discount, total, promoLabel, promo } =
    useCartDetails();
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const applyPromo = useCart((s) => s.applyPromo);
  const removePromo = useCart((s) => s.removePromo);
  const products = useShop((s) => s.products);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const recommended = products
    .filter((p) => !lines.some((l) => l.product.id === p.id))
    .filter((p) => p.tags.includes("bestseller") || p.tags.includes("new"))
    .slice(0, 8);

  if (!hydrated) {
    return (
      <div className="container-x py-24">
        <p className="font-display text-3xl text-ink-3">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <>
      <DocumentTitle title={t.cart.title} />
      <section className="container-x pt-10 pb-4">
        <nav className="flex items-center gap-2 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-ink">
            {t.common.home}
          </Link>
          <span>/</span>
          <span className="text-ink">{t.cart.title}</span>
        </nav>
        <div className="mt-6 flex items-end justify-between gap-6">
          <h1 className="font-display text-[2.4rem] leading-none sm:text-[3.2rem]">
            {t.cart.title}
          </h1>
          {count > 0 && (
            <p className="text-sm text-ink-3">
              {count} {plural(count, t.cart.count)}
            </p>
          )}
        </div>
      </section>

      {lines.length === 0 ? (
        <section className="container-x py-16">
          <div className="flex flex-col items-center rounded-[32px] border border-dashed border-ink/15 px-8 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand">
              <ShoppingBag className="h-6 w-6 text-ink-3" />
            </span>
            <p className="mt-6 font-display text-3xl">{t.cart.emptyTitle}</p>
            <p className="mt-3 max-w-sm text-sm text-ink-2">
              {t.cart.emptyText}
            </p>
            <Link href="/catalog" className={cn(buttonStyles(), "mt-8")}>
              {t.common.toCatalog}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : (
        <section className="container-x grid gap-10 py-8 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div>
            <ul className="border-t border-line">
              {lines.map((l) => (
                <li
                  key={l.product.id + l.color}
                  className="flex gap-4 border-b border-line py-6 sm:gap-6"
                >
                  <Link
                    href={`/product/${l.product.slug}`}
                    className="shrink-0"
                  >
                    <ProductArt
                      category={l.product.category}
                      seed={l.product.id}
                      className="h-32 w-26 rounded-2xl sm:h-36 sm:w-30"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[0.66rem] tracking-[0.18em] text-ink-3 uppercase">
                          {t.categories[l.product.category]?.title}
                        </p>
                        <Link
                          href={`/product/${l.product.slug}`}
                          className="mt-1 block font-display text-xl leading-tight hover:text-clay-2"
                        >
                          {l.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-ink-3">{colorName(l.color)}</p>
                      </div>
                      <button
                        type="button"
                        aria-label={t.cart.remove}
                        onClick={() => remove(l.product.id, l.color)}
                        className="cursor-pointer p-1 text-ink-3 transition-colors hover:text-[#b06a6a]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                      <QtyInput
                        value={l.qty}
                        onChange={(v) => setQty(l.product.id, l.color, v)}
                        max={Math.max(1, l.product.stock)}
                      />
                      <div className="text-right">
                        {l.qty > 1 && (
                          <p className="text-[0.7rem] text-ink-3">
                            {formatPrice(l.product.price)} × {l.qty}
                          </p>
                        )}
                        <p className="font-display text-xl leading-tight">
                          {formatPrice(l.product.price * l.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/catalog"
              className="mt-6 inline-flex items-center gap-2 text-sm text-ink-2"
            >
              <span className="link-underline">{t.cart.continue}</span>
            </Link>
          </div>

          {/* підсумок */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[26px] border border-line bg-white/50 p-6">
              <p className="font-display text-2xl">{t.common.total}</p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-3">{t.common.products}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#6f9268]">
                    <span>{t.common.discount} {promo && `(${promo})`}</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-ink-3">{t.common.delivery}</span>
                  <span className="text-ink-2">
                    {total >= FREE_SHIPPING_FROM
                      ? t.common.free
                      : t.cart.shippingByTariff}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
                <span className="text-sm">{t.common.toPay}</span>
                <span className="font-display text-3xl leading-none">
                  {formatPrice(total)}
                </span>
              </div>

              {/* промокод */}
              <div className="mt-6">
                {promo ? (
                  <div className="flex items-center justify-between rounded-2xl bg-sand/70 px-4 py-3 text-sm">
                    <span className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-clay-2" />
                      {promoLabel}
                    </span>
                    <button
                      type="button"
                      onClick={removePromo}
                      aria-label={t.common.close}
                      className="cursor-pointer text-ink-3 hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setError("");
                      }}
                      placeholder={t.cart.promo}
                      className="py-2.5 text-sm"
                    />
                    <Button
                      variant="soft"
                      onClick={() => {
                        if (!applyPromo(code)) setError(t.cart.promoWrong);
                        else setCode("");
                      }}
                    >
                      {t.common.apply}
                    </Button>
                  </div>
                )}
                {error && <p className="mt-2 text-xs text-[#b06a6a]">{error}</p>}
                {!promo && (
                  <p className="mt-2 text-[0.7rem] text-ink-3">
                    {t.cart.promoHint}
                  </p>
                )}
              </div>

              <Link
                href="/checkout"
                className={buttonStyles({ full: true, className: "mt-6" })}
              >
                {t.cart.checkout}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-ink-3">
                {t.cart.payNote}
              </p>
            </div>
          </aside>
        </section>
      )}

      {recommended.length > 0 && (
        <section className="container-x py-16 md:py-24">
          <SectionHeader
            eyebrow={t.cart.recommendEyebrow}
            title={t.cart.recommendTitle}
            href="/catalog"
            className="mb-12"
          />
          <ProductRail products={recommended} />
        </section>
      )}
    </>
  );
}
