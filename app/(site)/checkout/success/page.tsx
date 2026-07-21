"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Package, Sparkles, Truck } from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { useHydrated } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useColorName, useT } from "@/lib/i18n";

const icons = [Sparkles, Package, Truck];

function SuccessContent() {
  const t = useT();
  const colorName = useColorName();
  const params = useSearchParams();
  const id = params.get("order");
  const orders = useShop((s) => s.orders);
  const hydrated = useHydrated();
  const order = orders.find((o) => o.id === id);

  return (
    <>
      <DocumentTitle title={t.checkout.accepted} />
      <section className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e4efe2]">
          <Check className="h-7 w-7 text-[#4d6b48]" />
        </span>
        <h1 className="mt-8 font-display text-[2.6rem] leading-[1.05] sm:text-[3.4rem]">
          {t.success.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">
          {hydrated && order ? (
            <>
              {t.success.order}{" "}
              <span className="text-ink">
                {t.common.orderNo} {order.id}
              </span>{" "}
              {t.success.textWith}
            </>
          ) : (
            t.success.textPlain
          )}
        </p>
      </div>

      {hydrated && order && (
        <div className="mx-auto mt-12 max-w-2xl rounded-[28px] border border-line bg-white/50 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-2">{t.success.recipient}</p>
              <p className="text-sm text-ink-2">
                {order.customer.firstName} {order.customer.lastName}
                <br />
                {order.customer.phone}
                <br />
                {order.customer.email}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">{t.success.delivery}</p>
              <p className="text-sm text-ink-2">
                {t.deliveryMethods[order.delivery.method].title}
                <br />
                {order.delivery.city}
                <br />
                {order.delivery.branch}
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-4 border-t border-line pt-6">
            {order.items.map((i) => (
              <li key={i.productId + i.color} className="flex items-center gap-4">
                <ProductArt
                  category={i.category}
                  seed={i.productId}
                  className="h-16 w-14 shrink-0 rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base leading-tight">
                    {i.name}
                  </p>
                  <p className="text-[0.72rem] text-ink-3">
                    {colorName(i.color)} · {i.qty} {t.common.pcs}
                  </p>
                </div>
                <span className="shrink-0 text-sm">
                  {formatPrice(i.price * i.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-3">{t.success.paymentMethod}</span>
              <span>{t.paymentMethods[order.payment].title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-3">{t.common.delivery}</span>
              <span>
                {order.shipping === 0
                  ? t.common.free
                  : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-2">
              <span>{t.common.toPay}</span>
              <span className="font-display text-2xl">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
        {t.success.timeline.map((item, i) => (
          <div
            key={item.title}
            className="rounded-3xl border border-line bg-white/40 p-6 text-center"
          >
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sand">
              {(() => {
                const Icon = icons[i];
                return <Icon className="h-4.5 w-4.5 text-ink-2" />;
              })()}
            </span>
            <p className="mt-4 font-title text-lg leading-tight">
              {i + 1}. {item.title}
            </p>
            <p className="mt-1 text-xs text-ink-3">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link href="/profile" className={buttonStyles()}>
          {t.success.myOrders}
        </Link>
        <Link href="/catalog" className={buttonStyles({ variant: "outline" })}>
          {t.success.keepShopping}
        </Link>
      </div>
    </section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-24 text-center">
          <p className="font-display text-3xl text-ink-3">…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
