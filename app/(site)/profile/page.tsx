"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Heart,
  LogOut,
  Package,
  RotateCcw,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useShop } from "@/lib/store/shop";
import { useWishlist } from "@/lib/store/wishlist";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { useHydrated } from "@/lib/hooks";
import { demoCustomerOrderIds, statusMeta } from "@/lib/data/orders";
import { cn, formatPrice } from "@/lib/utils";
import { ProductArt } from "@/components/ui/ProductArt";
import { ProductCard } from "@/components/product/ProductCard";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useColorName, useDateFormat, usePlural, useT } from "@/lib/i18n";

const tabIcons = { orders: Package, wishlist: Heart, settings: Settings };
const tabIds = ["orders", "wishlist", "settings"] as const;

function ProfileContent() {
  const t = useT();
  const plural = usePlural();
  const colorName = useColorName();
  const formatDate = useDateFormat();
  const router = useRouter();
  const params = useSearchParams();
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const update = useAuth((s) => s.update);
  const orders = useShop((s) => s.orders);
  const products = useShop((s) => s.products);
  const wishIds = useWishlist((s) => s.ids);
  const addToCart = useCart((s) => s.add);
  const notify = useUI((s) => s.notify);

  const tab = params.get("tab") ?? "orders";
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
  } | null>(null);

  if (!hydrated) {
    return (
      <div className="container-x py-24">
        <p className="font-display text-3xl text-ink-3">{t.common.loading}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-4xl">{t.profile.notLogged}</p>
        <p className="mt-4 text-sm text-ink-2">
          {t.profile.notLoggedText}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/login" className={buttonStyles()}>
            {t.common.login}
          </Link>
          <Link
            href="/register"
            className={buttonStyles({ variant: "outline" })}
          >
            {t.common.register}
          </Link>
        </div>
      </div>
    );
  }

  const myOrders = orders.filter(
    (o) =>
      o.customer.email.toLowerCase() === user.email ||
      demoCustomerOrderIds.includes(o.id),
  );
  const spent = myOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const wishProducts = products.filter((p) => wishIds.includes(p.id));
  const data = form ?? {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    city: user.city ?? "",
  };

  return (
    <>
      <DocumentTitle title={t.common.profile} />
      <section className="container-x py-10 md:py-14">
      {/* шапка профілю */}
      <div className="flex flex-col gap-6 rounded-[2rem] border border-line bg-white/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sand font-display text-2xl">
            {user.firstName[0]}
            {user.lastName[0]}
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-[2rem] leading-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="truncate text-sm text-ink-3">{user.email}</p>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[0.68rem] tracking-wide text-paper"
              >
                <ShieldCheck className="h-3 w-3" />
                {t.header.adminPanel}
              </Link>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="font-display text-2xl leading-none">
              {myOrders.length}
            </p>
            <p className="mt-1.5 text-[0.7rem] text-ink-3">
              {plural(myOrders.length, t.profile.ordersCount)}
            </p>
          </div>
          <div>
            <p className="font-display text-2xl leading-none">
              {formatPrice(spent)}
            </p>
            <p className="mt-1.5 text-[0.7rem] text-ink-3">{t.profile.spent}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex cursor-pointer items-center gap-2 self-start text-sm text-ink-3 transition-colors hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
            {t.common.logout}
          </button>
        </div>
      </div>

      {/* вкладки */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {tabIds.map((id) => {
          const Icon = tabIcons[id];
          return (
            <Link
              key={id}
              href={`/profile?tab=${id}`}
              scroll={false}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.82rem] font-medium whitespace-nowrap transition-colors",
                tab === id
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/12 text-ink-2 hover:border-ink/35",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.profile.tabs[id]}
            </Link>
          );
        })}
      </div>

      {/* замовлення */}
      {tab === "orders" && (
        <div className="mt-8">
          {myOrders.length === 0 ? (
            <EmptyState
              title={t.profile.emptyOrders}
              text={t.profile.emptyOrdersText}
            />
          ) : (
            <ul className="space-y-4">
              {myOrders.map((o) => {
                const meta = statusMeta[o.status];
                const statusLabel = t.statuses[o.status];
                const open = openOrder === o.id;
                return (
                  <li
                    key={o.id}
                    className="overflow-hidden rounded-[26px] border border-line bg-white/50"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenOrder(open ? null : o.id)}
                      className="flex w-full cursor-pointer flex-wrap items-center gap-4 p-5 text-left sm:p-6"
                    >
                      <div className="flex -space-x-4">
                        {o.items.slice(0, 3).map((i) => (
                          <ProductArt
                            key={i.productId + i.color}
                            category={i.category}
                            seed={i.productId}
                            className="h-14 w-12 rounded-xl border-2 border-paper"
                          />
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-xl leading-tight">
                          {t.common.orderNo} {o.id}
                        </p>
                        <p className="text-xs text-ink-3">
                          {formatDate(o.createdAt)} ·{" "}
                          {o.items.reduce((s, i) => s + i.qty, 0)}{" "}
                          {plural(
                            o.items.reduce((s, i) => s + i.qty, 0),
                            t.cart.count,
                          )}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.72rem]",
                          meta.className,
                        )}
                      >
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", meta.dot)}
                        />
                        {statusLabel}
                      </span>
                      <span className="font-display text-xl">
                        {formatPrice(o.total)}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-ink-3 transition-transform duration-300",
                          open && "rotate-180",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-line px-5 py-6 sm:px-6">
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <p className="eyebrow mb-2">{t.common.delivery}</p>
                              <p className="text-sm text-ink-2">
                                {t.deliveryMethods[o.delivery.method].title}
                                <br />
                                {o.delivery.city}
                                <br />
                                {o.delivery.branch}
                              </p>
                            </div>
                            <div>
                              <p className="eyebrow mb-2">{t.common.payment}</p>
                              <p className="text-sm text-ink-2">
                                {t.paymentMethods[o.payment].title}
                              </p>
                              {o.comment && (
                                <>
                                  <p className="eyebrow mt-4 mb-2">{t.profile.comment}</p>
                                  <p className="text-sm text-ink-2">
                                    {o.comment}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          <ul className="mt-6 space-y-3 border-t border-line pt-5">
                            {o.items.map((i) => (
                              <li
                                key={i.productId + i.color}
                                className="flex items-center justify-between gap-4 text-sm"
                              >
                                <span className="min-w-0">
                                  <span className="block truncate">
                                    {i.name}
                                  </span>
                                  <span className="text-[0.72rem] text-ink-3">
                                    {colorName(i.color)} · {i.qty} {t.common.pcs}
                                  </span>
                                </span>
                                <span className="shrink-0">
                                  {formatPrice(i.price * i.qty)}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                o.items.forEach((i) =>
                                  addToCart(i.productId, i.color, i.qty),
                                );
                                notify(
                                  t.profile.repeated,
                                  t.profile.repeatedText,
                                );
                              }}
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              {t.profile.repeat}
                            </Button>
                            <span className="text-sm">
                              {t.common.total}:{" "}
                              <span className="font-display text-xl">
                                {formatPrice(o.total)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* обране */}
      {tab === "wishlist" && (
        <div className="mt-8">
          {wishProducts.length === 0 ? (
            <EmptyState
              title={t.profile.emptyWish}
              text={t.profile.emptyWishText}
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {wishProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* налаштування */}
      {tab === "settings" && (
        <div className="mt-8 max-w-2xl rounded-[26px] border border-line bg-white/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl">{t.profile.settingsTitle}</h2>
          <p className="mt-2 text-sm text-ink-2">
            {t.profile.settingsText}
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="pf">{t.checkout.firstName}</Label>
              <Input
                id="pf"
                value={data.firstName}
                onChange={(e) =>
                  setForm({ ...data, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="pl">{t.checkout.lastName}</Label>
              <Input
                id="pl"
                value={data.lastName}
                onChange={(e) => setForm({ ...data, lastName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="pp">{t.checkout.phone}</Label>
              <Input
                id="pp"
                value={data.phone}
                onChange={(e) => setForm({ ...data, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="pc">{t.profile.city}</Label>
              <Input
                id="pc"
                value={data.city}
                onChange={(e) => setForm({ ...data, city: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="pe">{t.checkout.email}</Label>
              <Input id="pe" value={user.email} disabled />
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                update(data);
                notify(t.profile.saved);
              }}
            >
              {t.common.save}
            </Button>
            <Button variant="ghost" onClick={() => setForm(null)}>
              {t.common.cancel}
            </Button>
          </div>
        </div>
      )}
    </section>
    </>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  const t = useT();
  return (
    <div className="rounded-[28px] border border-dashed border-ink/15 px-8 py-20 text-center">
      <p className="font-display text-2xl">{title}</p>
      <p className="lead mx-auto mt-3 max-w-sm text-sm">{text}</p>
      <Link href="/catalog" className={cn(buttonStyles(), "mt-7")}>
        {t.common.toCatalog}
      </Link>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="container-x py-24" />}>
      <ProfileContent />
    </Suspense>
  );
}
