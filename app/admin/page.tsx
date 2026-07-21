"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { statusMeta } from "@/lib/data/orders";
import { useDateFormat, useT } from "@/lib/i18n";
import { categoryMap } from "@/lib/data/categories";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { ProductArt } from "@/components/ui/ProductArt";

export default function AdminDashboard() {
  const t = useT();
  const formatDateShort = useDateFormat();
  const orders = useShop((s) => s.orders);
  const products = useShop((s) => s.products);

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status !== "cancelled");
    const revenue = active.reduce((s, o) => s + o.total, 0);
    const avg = active.length ? Math.round(revenue / active.length) : 0;
    const customers = new Set(orders.map((o) => o.customer.email)).size;
    return { revenue, avg, customers, count: orders.length };
  }, [orders]);

  const chart = useMemo(() => {
    const byDay = new Map<string, number>();
    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((o) => {
        const key = o.createdAt.slice(0, 10);
        byDay.set(key, (byDay.get(key) ?? 0) + o.total);
      });
    const days = [...byDay.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
    const recent = days.slice(-12);
    const max = Math.max(...recent.map(([, v]) => v), 1);
    return { recent, max };
  }, [orders]);

  const topProducts = useMemo(() => {
    const counter = new Map<string, { qty: number; sum: number }>();
    orders.forEach((o) =>
      o.items.forEach((i) => {
        const prev = counter.get(i.productId) ?? { qty: 0, sum: 0 };
        counter.set(i.productId, {
          qty: prev.qty + i.qty,
          sum: prev.sum + i.qty * i.price,
        });
      }),
    );
    return [...counter.entries()]
      .map(([id, v]) => ({ product: products.find((p) => p.id === id), ...v }))
      .filter((x) => x.product)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [orders, products]);

  const lowStock = products.filter((p) => p.stock <= 8).slice(0, 5);
  const newOrders = orders.filter((o) => o.status === "new").length;

  const cards = [
    {
      label: t.admin.cards.revenue,
      value: formatPrice(stats.revenue),
      icon: TrendingUp,
      hint: t.admin.cards.revenueHint,
    },
    {
      label: t.admin.cards.orders,
      value: formatNumber(stats.count),
      icon: ShoppingBag,
      hint: `${newOrders} ${t.admin.cards.ordersHint}`,
    },
    {
      label: t.admin.cards.avg,
      value: formatPrice(stats.avg),
      icon: Package,
      hint: t.admin.cards.avgHint,
    },
    {
      label: t.admin.cards.customers,
      value: formatNumber(stats.customers),
      icon: Users,
      hint: t.admin.cards.customersHint,
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">{t.admin.overview}</p>
          <h1 className="font-display text-[2.2rem] leading-none sm:text-[2.8rem]">
            {t.admin.greeting}
          </h1>
          <p className="mt-3 text-sm text-ink-2">
            {t.admin.greetingText}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.8rem] text-paper transition-colors hover:bg-ink-2"
        >
          {t.admin.addProduct}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* показники */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-[24px] border border-line bg-paper p-6"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                <c.icon className="h-4 w-4 text-ink-2" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-ink-3" />
            </div>
            <p className="mt-5 font-display text-[1.9rem] leading-none">
              {c.value}
            </p>
            <p className="mt-2 text-sm text-ink-2">{c.label}</p>
            <p className="mt-1 text-[0.7rem] text-ink-3">{c.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        {/* графік */}
        <div className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-2xl leading-none">
                {t.admin.chartTitle}
              </p>
              <p className="mt-2 text-xs text-ink-3">
                {t.admin.chartText}
              </p>
            </div>
            <p className="font-display text-2xl leading-none">
              {formatPrice(stats.revenue)}
            </p>
          </div>

          <div className="mt-8 flex h-56 items-end gap-2 sm:gap-3">
            {chart.recent.map(([day, value]) => (
              <div
                key={day}
                className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="shrink-0 text-[0.62rem] whitespace-nowrap text-ink-3 opacity-0 transition-opacity group-hover:opacity-100">
                  {formatPrice(value)}
                </span>
                <div
                  className="w-full shrink-0 rounded-t-xl bg-gradient-to-t from-sand-3 to-clay transition-all duration-500 group-hover:from-clay group-hover:to-clay-2"
                  style={{ height: `${8 + (value / chart.max) * 78}%` }}
                />
                <span className="shrink-0 text-[0.6rem] text-ink-3">
                  {day.slice(8)}.{day.slice(5, 7)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* топ товарів */}
        <div className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
          <p className="font-display text-2xl leading-none">{t.admin.topProducts}</p>
          <ul className="mt-6 space-y-4">
            {topProducts.map(({ product, qty, sum }) => (
              <li key={product!.id} className="flex items-center gap-3">
                <ProductArt
                  category={product!.category}
                  seed={product!.id}
                  className="h-12 w-11 shrink-0 rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{product!.name}</p>
                  <p className="text-[0.7rem] text-ink-3">
                    {t.categories[product!.category]?.title} · {qty} {t.common.pcs}
                  </p>
                </div>
                <span className="shrink-0 text-sm">{formatPrice(sum)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        {/* останні замовлення */}
        <div className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl leading-none">
              {t.admin.lastOrders}
            </p>
            <Link
              href="/admin/orders"
              className="text-[0.78rem] text-ink-3 hover:text-ink"
            >
              {t.admin.all}
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead>
                <tr className="text-[0.68rem] tracking-[0.14em] text-ink-3 uppercase">
                  <th className="pb-3 font-normal">{t.admin.table.order}</th>
                  <th className="pb-3 font-normal">{t.admin.table.client}</th>
                  <th className="pb-3 font-normal">{t.admin.table.date}</th>
                  <th className="pb-3 font-normal">{t.admin.table.status}</th>
                  <th className="pb-3 text-right font-normal">{t.admin.table.sum}</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => {
                  const meta = statusMeta[o.status];
                  return (
                    <tr key={o.id} className="border-t border-line">
                      <td className="py-3.5">{t.common.orderNo} {o.id}</td>
                      <td className="py-3.5 text-ink-2">
                        {o.customer.firstName} {o.customer.lastName}
                      </td>
                      <td className="py-3.5 text-ink-3">
                        {formatDateShort(o.createdAt)}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem]",
                            meta.className,
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              meta.dot,
                            )}
                          />
                          {t.statuses[o.status]}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {formatPrice(o.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* залишки */}
        <div className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
          <p className="font-display text-2xl leading-none">{t.admin.lowStock}</p>
          <p className="mt-2 text-xs text-ink-3">
            {t.admin.lowStockText}
          </p>
          <ul className="mt-6 space-y-3">
            {lowStock.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm">{p.name}</p>
                  <p className="text-[0.7rem] text-ink-3">
                    {t.categories[p.category]?.title}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[0.7rem]",
                    p.stock <= 5
                      ? "bg-[#f2e2e2] text-[#9c5c5c]"
                      : "bg-sand-2 text-ink-2",
                  )}
                >
                  {p.stock} {t.common.pcs}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
