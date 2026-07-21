"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { useUI } from "@/lib/store/ui";
import { statusMeta } from "@/lib/data/orders";
import { useColorName, useDateFormat, useT } from "@/lib/i18n";
import type { OrderStatus } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/Field";
import { ProductArt } from "@/components/ui/ProductArt";
import { useLockBody } from "@/lib/hooks";

const statuses: (OrderStatus | "all")[] = [
  "all",
  "new",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrders() {
  const t = useT();
  const colorName = useColorName();
  const formatDate = useDateFormat();
  const orders = useShop((s) => s.orders);
  const setOrderStatus = useShop((s) => s.setOrderStatus);
  const notify = useUI((s) => s.notify);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  useLockBody(!!selected);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        `${o.customer.firstName} ${o.customer.lastName}`
          .toLowerCase()
          .includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.email.toLowerCase().includes(q)
      );
    });
  }, [orders, filter, query]);

  const order = orders.find((o) => o.id === selected);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">{t.admin.nav.orders}</p>
          <h1 className="font-display text-[2.2rem] leading-none sm:text-[2.8rem]">
            {t.admin.ordersTitle}
          </h1>
          <p className="mt-3 text-sm text-ink-2">
            {t.admin.ordersText}
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.admin.searchOrders}
            className="pl-11"
          />
        </div>
      </div>

      {/* фільтри */}
      <div className="hide-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
        {statuses.map((s) => {
          const count =
            s === "all"
              ? orders.length
              : orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-[0.78rem] whitespace-nowrap transition-colors",
                filter === s
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/12 bg-paper text-ink-2 hover:border-ink/35",
              )}
            >
              {s === "all" ? t.admin.all : t.statuses[s]}
              <span
                className={cn(
                  "ml-2 text-[0.7rem]",
                  filter === s ? "text-paper/60" : "text-ink-3",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* таблиця */}
      <div className="mt-6 overflow-hidden rounded-[24px] border border-line bg-paper">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="bg-sand/40 text-[0.68rem] tracking-[0.14em] text-ink-3 uppercase">
                <th className="px-6 py-4 font-normal">{t.admin.table.order}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.client}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.delivery}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.date}</th>
                <th className="px-6 py-4 font-normal">{t.admin.table.status}</th>
                <th className="px-6 py-4 text-right font-normal">{t.admin.table.sum}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const meta = statusMeta[o.status];
                return (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o.id)}
                    className="cursor-pointer border-t border-line transition-colors hover:bg-sand/30"
                  >
                    <td className="px-6 py-4">
                      <span className="block">{t.common.orderNo} {o.id}</span>
                      <span className="text-[0.7rem] text-ink-3">
                        {o.items.length} {t.admin.positions}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="block text-ink-2">
                        {o.customer.firstName} {o.customer.lastName}
                      </span>
                      <span className="text-[0.7rem] text-ink-3">
                        {o.customer.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-ink-2">
                      <span className="block">{o.delivery.city}</span>
                      <span className="text-[0.7rem] text-ink-3">
                        {t.deliveryMethods[o.delivery.method].title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-ink-3">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem]",
                          meta.className,
                        )}
                      >
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", meta.dot)}
                        />
                        {t.statuses[o.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatPrice(o.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="px-6 py-16 text-center text-sm text-ink-3">
            {t.admin.noOrders}
          </p>
        )}
      </div>

      {/* деталі */}
      <div
        className={cn(
          "fixed inset-0 z-50",
          order ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setSelected(null)}
          className={cn(
            "absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-500",
            order ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            order ? "translate-x-0" : "translate-x-full",
          )}
        >
          {order && (
            <>
              <div className="flex items-start justify-between border-b border-line px-6 py-5">
                <div>
                  <p className="font-display text-2xl leading-none">
                    {t.common.orderNo} {order.id}
                  </p>
                  <p className="mt-2 text-xs text-ink-3">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label={t.common.close}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-sand"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="eyebrow mb-3">{t.admin.statusLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "new",
                      "processing",
                      "shipped",
                      "delivered",
                      "cancelled",
                    ] as OrderStatus[]
                  ).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setOrderStatus(order.id, s);
                        notify(t.admin.statusUpdated, t.statuses[s]);
                      }}
                      className={cn(
                        "cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.75rem] transition-colors",
                        order.status === s
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/12 text-ink-2 hover:border-ink/35",
                      )}
                    >
                      {t.statuses[s]}
                    </button>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-2">{t.admin.client}</p>
                    <p className="text-sm text-ink-2">
                      {order.customer.firstName} {order.customer.lastName}
                      <br />
                      {order.customer.phone}
                      <br />
                      {order.customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">{t.common.delivery}</p>
                    <p className="text-sm text-ink-2">
                      {t.deliveryMethods[order.delivery.method].title}
                      <br />
                      {order.delivery.city}
                      <br />
                      {order.delivery.branch}
                    </p>
                  </div>
                </div>

                {order.comment && (
                  <div className="mt-6 rounded-2xl bg-sand/60 px-5 py-4">
                    <p className="eyebrow mb-1">{t.admin.clientComment}</p>
                    <p className="text-sm text-ink-2">{order.comment}</p>
                  </div>
                )}

                <p className="eyebrow mt-8 mb-3">{t.admin.orderItems}</p>
                <ul className="space-y-4">
                  {order.items.map((i) => (
                    <li
                      key={i.productId + i.color}
                      className="flex items-center gap-4"
                    >
                      <ProductArt
                        category={i.category}
                        seed={i.productId}
                        className="h-16 w-14 shrink-0 rounded-xl"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{i.name}</p>
                        <p className="text-[0.7rem] text-ink-3">
                          {colorName(i.color)} · {i.qty} × {formatPrice(i.price)}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm">
                        {formatPrice(i.price * i.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-3">{t.common.products}</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-[#6f9268]">
                      <span>{t.common.discount}</span>
                      <span>−{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink-3">{t.common.delivery}</span>
                    <span>
                      {order.shipping === 0
                        ? t.common.free
                        : formatPrice(order.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-3">{t.common.payment}</span>
                    <span>{t.paymentMethods[order.payment].title}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
                  <span className="text-sm">{t.common.total}</span>
                  <span className="font-display text-3xl leading-none">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
