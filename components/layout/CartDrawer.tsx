"use client";

import Link from "next/link";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useUI } from "@/lib/store/ui";
import { useCart } from "@/lib/store/cart";
import { useCartDetails, useLockBody } from "@/lib/hooks";
import { cn, formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_FROM } from "@/lib/data/delivery";
import { ProductArt } from "@/components/ui/ProductArt";
import { QtyInput } from "@/components/ui/QtyInput";
import { buttonStyles } from "@/components/ui/Button";
import { useColorName, useLocalizeProducts, usePlural, useT } from "@/lib/i18n";

export function CartDrawer() {
  const t = useT();
  const plural = usePlural();
  const colorName = useColorName();
  const localize = useLocalizeProducts();
  const open = useUI((s) => s.cartOpen);
  const setOpen = useUI((s) => s.setCartOpen);
  const { lines, count, subtotal } = useCartDetails();
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  useLockBody(open);

  const left = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80]",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="font-display text-2xl leading-none">{t.cart.title}</p>
            <p className="mt-1.5 text-xs text-ink-3">
              {count} {plural(count, t.cart.count)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.common.close}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-sand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand">
              <ShoppingBag className="h-6 w-6 text-ink-3" />
            </span>
            <p className="font-display text-xl">{t.cart.drawerEmptyTitle}</p>
            <p className="text-sm text-ink-2">{t.cart.drawerEmptyText}</p>
            <Link
              href="/catalog"
              onClick={() => setOpen(false)}
              className={buttonStyles({ className: "mt-2" })}
            >
              {t.common.toCatalog}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {subtotal < FREE_SHIPPING_FROM && (
                <div className="mb-5 rounded-2xl bg-sage/15 p-4">
                  <p className="text-xs text-ink-2">
                    {t.cart.freeLeft}{" "}
                    <span className="font-semibold">{formatPrice(left)}</span>
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/70">
                    <div
                      className="h-full rounded-full bg-sage transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <ul className="space-y-5">
                {lines.map((l) => {
                  const p = localize([l.product])[0];
                  return (
                    <li key={p.id + l.color} className="flex gap-4">
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="shrink-0"
                      >
                        <ProductArt
                          category={p.category}
                          seed={p.id}
                          className="h-24 w-20 rounded-2xl"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={() => setOpen(false)}
                            className="font-title text-base leading-tight hover:text-clay-2"
                          >
                            {p.name}
                          </Link>
                          <button
                            type="button"
                            aria-label={t.cart.remove}
                            onClick={() => remove(p.id, l.color)}
                            className="cursor-pointer text-ink-3 transition-colors hover:text-rose"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-ink-3">
                          {colorName(l.color)}
                        </p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <QtyInput
                            compact
                            value={l.qty}
                            onChange={(v) => setQty(p.id, l.color, v)}
                          />
                          <span className="text-sm font-semibold">
                            {formatPrice(p.price * l.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-2">{t.common.total}</span>
                <span className="font-display text-2xl">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-3">{t.cart.shippingLater}</p>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className={buttonStyles({ full: true })}
                >
                  {t.cart.checkout}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className={buttonStyles({ variant: "outline", full: true })}
                >
                  {t.cart.open}
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
