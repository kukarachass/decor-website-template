"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Inbox,
  Lock,
  Mail,
  Truck,
} from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useShop } from "@/lib/store/shop";
import { useAuth } from "@/lib/store/auth";
import { useUI } from "@/lib/store/ui";
import { useCartDetails, useHydrated } from "@/lib/hooks";
import {
  branchesFor,
  cities,
  deliveryOptions,
  paymentOptions,
  shippingCost,
} from "@/lib/data/delivery";
import type { DeliveryMethod, Order, PaymentMethod } from "@/lib/types";
import { cn, formatPrice, plural } from "@/lib/utils";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input, Label, Select, Textarea, FieldError } from "@/components/ui/Field";
import { ProductArt } from "@/components/ui/ProductArt";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useColorName, usePlural, useT } from "@/lib/i18n";

const deliveryIcons = { "np-branch": Truck, "np-locker": Inbox, ukrposhta: Mail };

export default function CheckoutPage() {
  const t = useT();
  const plural = usePlural();
  const colorName = useColorName();
  const router = useRouter();
  const hydrated = useHydrated();
  const { lines, count, subtotal, discount, total, promo } = useCartDetails();
  const clear = useCart((s) => s.clear);
  const addOrder = useShop((s) => s.addOrder);
  const user = useAuth((s) => s.user);
  const notify = useUI((s) => s.notify);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    method: "np-branch" as DeliveryMethod,
    city: "Київ",
    branch: "",
    comment: "",
    payment: "online" as PaymentMethod,
    agree: true,
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        firstName: f.firstName || user.firstName,
        lastName: f.lastName || user.lastName,
        email: f.email || user.email,
        phone: f.phone || user.phone,
        city: user.city ?? f.city,
      }));
    }
  }, [user]);

  const branchList = branchesFor(form.city, form.method);
  const shipping = shippingCost(form.method, total);
  const grandTotal = total + shipping;

  const set = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors({});
  };

  const validate = (current: number) => {
    const e: Record<string, string> = {};
    if (current === 0) {
      if (!form.firstName.trim()) e.firstName = t.checkout.errors.firstName;
      if (!form.lastName.trim()) e.lastName = t.checkout.errors.lastName;
      if (form.phone.replace(/\D/g, "").length < 9)
        e.phone = t.checkout.errors.phone;
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t.checkout.errors.email;
    }
    if (current === 1) {
      if (!form.branch) e.branch = t.checkout.errors.branch;
    }
    if (current === 2) {
      if (!form.agree) e.agree = t.checkout.errors.agree;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate(2)) return;
    const id = "ZD-" + String(Date.now()).slice(-6);
    const order: Order = {
      id,
      createdAt: new Date().toISOString(),
      status: "new",
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
      },
      delivery: {
        method: form.method,
        city: form.city,
        branch: form.branch,
      },
      payment: form.payment,
      items: lines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        category: l.product.category,
        color: l.color,
        qty: l.qty,
        price: l.product.price,
      })),
      subtotal,
      shipping,
      discount,
      total: grandTotal,
      comment: form.comment || undefined,
    };
    addOrder(order);
    clear();
    notify(t.checkout.accepted, `${t.common.orderNo} ${id}`);
    router.push(`/checkout/success?order=${id}`);
  };

  if (!hydrated) {
    return (
      <div className="container-x py-24">
        <p className="font-display text-3xl text-ink-3">{t.common.loading}</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-4xl">{t.cart.emptyTitle}</p>
        <p className="mt-4 text-sm text-ink-2">
          {t.cart.emptyText}
        </p>
        <Link href="/catalog" className={cn(buttonStyles(), "mt-8")}>
          {t.common.toCatalog}
        </Link>
      </div>
    );
  }

  return (
    <>
      <DocumentTitle title={t.checkout.title} />
      <section className="container-x py-10 md:py-14">
      <nav className="flex items-center gap-2 text-[0.72rem] text-ink-3">
        <Link href="/cart" className="hover:text-ink">
          {t.cart.title}
        </Link>
        <span>/</span>
        <span className="text-ink">{t.checkout.title}</span>
      </nav>

      <h1 className="mt-6 font-display text-[2.4rem] leading-none sm:text-[3rem]">
        {t.checkout.title}
      </h1>

      {/* кроки */}
      <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
        {t.checkout.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={cn(
                "flex items-center gap-2.5 rounded-full border px-4 py-2 text-[0.78rem] transition-colors",
                i === step
                  ? "border-ink bg-ink text-paper"
                  : i < step
                    ? "cursor-pointer border-ink/20 text-ink"
                    : "border-ink/10 text-ink-3",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem]",
                  i === step
                    ? "bg-paper/20"
                    : i < step
                      ? "bg-[#6f9268] text-paper"
                      : "bg-sand",
                )}
              >
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {s}
            </button>
            {i < t.checkout.steps.length - 1 && (
              <span className="hidden h-px w-8 bg-line sm:block" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
        <div>
          {/* Крок 1 */}
          {step === 0 && (
            <div className="animate-[rise_0.5s_ease-out]">
              <h2 className="font-display text-2xl">{t.checkout.contactsTitle}</h2>
              <p className="mt-2 text-sm text-ink-2">
                {t.checkout.contactsText}
              </p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{t.checkout.firstName}</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => set({ firstName: e.target.value })}
                    placeholder="Olena"
                  />
                  <FieldError>{errors.firstName}</FieldError>
                </div>
                <div>
                  <Label htmlFor="lastName">{t.checkout.lastName}</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => set({ lastName: e.target.value })}
                    placeholder="Kovalchuk"
                  />
                  <FieldError>{errors.lastName}</FieldError>
                </div>
                <div>
                  <Label htmlFor="phone">{t.checkout.phone}</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => set({ phone: e.target.value })}
                    placeholder="+380 (__) ___-__-__"
                  />
                  <FieldError>{errors.phone}</FieldError>
                </div>
                <div>
                  <Label htmlFor="email">{t.checkout.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set({ email: e.target.value })}
                    placeholder="you@email.com"
                  />
                  <FieldError>{errors.email}</FieldError>
                </div>
              </div>
              {!user && (
                <p className="mt-6 rounded-2xl bg-sand/60 px-5 py-4 text-sm text-ink-2">
                  {t.checkout.haveAccount}{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    {t.checkout.haveAccountLink}
                  </Link>{" "}
                  {t.checkout.haveAccountTail}
                </p>
              )}
            </div>
          )}

          {/* Крок 2 */}
          {step === 1 && (
            <div className="animate-[rise_0.5s_ease-out]">
              <h2 className="font-display text-2xl">{t.checkout.deliveryTitle}</h2>
              <p className="mt-2 text-sm text-ink-2">
                {t.checkout.deliveryText}
              </p>

              <div className="mt-7 space-y-3">
                {deliveryOptions.map((d) => {
                  const Icon = deliveryIcons[d.id];
                  const active = form.method === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => set({ method: d.id, branch: "" })}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-4 rounded-3xl border p-5 text-left transition-all",
                        active
                          ? "border-ink bg-white/70"
                          : "border-line hover:border-ink/30",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                          active ? "bg-ink text-paper" : "bg-sand text-ink-2",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg leading-tight">
                          {t.deliveryMethods[d.id].title}
                        </span>
                        <span className="block text-xs text-ink-3">
                          {t.deliveryMethods[d.id].caption} · {t.deliveryMethods[d.id].eta}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm">
                        {total >= 1500 ? "0 ₴" : formatPrice(d.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city">{t.checkout.city}</Label>
                  <Select
                    id="city"
                    value={form.city}
                    onChange={(e) => set({ city: e.target.value, branch: "" })}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">
                    {form.method === "np-locker" ? t.checkout.locker : t.checkout.branch}
                  </Label>
                  <Select
                    id="branch"
                    value={form.branch}
                    onChange={(e) => set({ branch: e.target.value })}
                  >
                    <option value="">{t.checkout.choose}</option>
                    {branchList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                  <FieldError>{errors.branch}</FieldError>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="comment">{t.checkout.comment}</Label>
                <Textarea
                  id="comment"
                  value={form.comment}
                  onChange={(e) => set({ comment: e.target.value })}
                  placeholder={t.checkout.commentPlaceholder}
                />
              </div>
            </div>
          )}

          {/* Крок 3 */}
          {step === 2 && (
            <div className="animate-[rise_0.5s_ease-out]">
              <h2 className="font-display text-2xl">{t.checkout.paymentTitle}</h2>
              <p className="mt-2 text-sm text-ink-2">
                {t.checkout.paymentText}
              </p>

              <div className="mt-7 space-y-3">
                {paymentOptions.map((p) => {
                  const active = form.payment === p.id;
                  const Icon = p.id === "online" ? CreditCard : Banknote;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => set({ payment: p.id })}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-4 rounded-3xl border p-5 text-left transition-all",
                        active
                          ? "border-ink bg-white/70"
                          : "border-line hover:border-ink/30",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                          active ? "bg-ink text-paper" : "bg-sand text-ink-2",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg leading-tight">
                          {t.paymentMethods[p.id].title}
                        </span>
                        <span className="block text-xs text-ink-3">
                          {t.paymentMethods[p.id].caption}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          active ? "border-ink bg-ink" : "border-ink/25",
                        )}
                      >
                        {active && <Check className="h-3 w-3 text-paper" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {form.payment === "online" && (
                <div className="mt-6 rounded-3xl border border-line bg-white/50 p-6">
                  <p className="flex items-center gap-2 text-sm text-ink-2">
                    <Lock className="h-3.5 w-3.5 text-clay-2" />
                    {t.checkout.cardForm}
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_7rem_6rem]">
                    <div>
                      <Label>{t.checkout.cardNumber}</Label>
                      <Input placeholder="0000 0000 0000 0000" disabled />
                    </div>
                    <div>
                      <Label>{t.checkout.cardExp}</Label>
                      <Input placeholder="12 / 28" disabled />
                    </div>
                    <div>
                      <Label>{t.checkout.cardCvv}</Label>
                      <Input placeholder="•••" disabled />
                    </div>
                  </div>
                  <p className="mt-4 text-[0.7rem] text-ink-3">
                    {t.checkout.cardNote}
                  </p>
                </div>
              )}

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink-2">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    form.agree ? "border-ink bg-ink" : "border-ink/25",
                  )}
                >
                  {form.agree && <Check className="h-3 w-3 text-paper" />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={form.agree}
                  onChange={(e) => set({ agree: e.target.checked })}
                />
                {t.checkout.agree}
              </label>
              <FieldError>{errors.agree}</FieldError>
            </div>
          )}

          {/* навігація */}
          <div className="mt-9 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-2 hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.common.back}
              </button>
            ) : (
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.checkout.toCart}
              </Link>
            )}

            {step < 2 ? (
              <Button
                size="lg"
                onClick={() => validate(step) && setStep((s) => s + 1)}
              >
                {t.common.next}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="lg" onClick={submit}>
                {t.checkout.submit}
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* підсумок */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[26px] border border-line bg-white/50 p-6">
            <p className="font-display text-2xl">{t.checkout.summary}</p>
            <p className="mt-1 text-xs text-ink-3">
              {count} {plural(count, t.cart.count)}
            </p>

            <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {lines.map((l) => (
                <li key={l.product.id + l.color} className="flex gap-3">
                  <ProductArt
                    category={l.product.category}
                    seed={l.product.id}
                    className="h-16 w-14 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base leading-tight">
                      {l.product.name}
                    </p>
                    <p className="text-[0.7rem] text-ink-3">
                      {colorName(l.color)} · {l.qty} {t.common.pcs}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm">
                    {formatPrice(l.product.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
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
                <span>{shipping === 0 ? t.common.free : formatPrice(shipping)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
              <span className="text-sm">{t.common.toPay}</span>
              <span className="font-display text-3xl leading-none">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
    </>
  );
}
