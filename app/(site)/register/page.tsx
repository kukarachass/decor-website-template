"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useUI } from "@/lib/store/ui";
import { Input, Label, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { LogoMark } from "@/components/ui/Logo";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useT } from "@/lib/i18n";

export default function RegisterPage() {
  const t = useT();
  const router = useRouter();
  const register = useAuth((s) => s.register);
  const notify = useUI((s) => s.notify);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const set = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(form);
    if (!res.ok) {
      setError(res.error ?? t.auth.errRegister);
      return;
    }
    notify(t.auth.created, t.auth.createdText);
    router.push("/profile");
  };

  return (
    <>
      <DocumentTitle title={t.common.register} />
      <section className="container-x py-12 md:py-20">
      <div className="grid overflow-hidden rounded-[2.5rem] border border-line bg-white/40 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <ProductArt
            category="tyulpany"
            seed="register-art"
            className="absolute inset-0 h-full w-full"
            strokeWidth={0.6}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            <p className="eyebrow mb-4">{t.auth.perksTitle}</p>
            <ul className="space-y-3">
              {t.auth.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto max-w-sm">
            <LogoMark className="w-7 text-ink" />
            <h1 className="mt-8 font-display text-[2.4rem] leading-[1.05]">
              {t.auth.registerTitle}
            </h1>
            <p className="mt-3 text-sm text-ink-2">
              {t.auth.registerText}
            </p>

            <form onSubmit={submit} className="mt-9 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{t.checkout.firstName}</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => set({ firstName: e.target.value })}
                    placeholder="Olena"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t.checkout.lastName}</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => set({ lastName: e.target.value })}
                    placeholder="Kovalchuk"
                  />
                </div>
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
              </div>
              <div>
                <Label htmlFor="phone">{t.checkout.phone}</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => set({ phone: e.target.value })}
                  placeholder="+380 (__) ___-__-__"
                />
              </div>
              <div>
                <Label htmlFor="password">{t.auth.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => set({ password: e.target.value })}
                  placeholder={t.auth.passwordHint}
                />
                <FieldError>{error}</FieldError>
              </div>

              <Button type="submit" size="lg" full>
                {t.auth.signUp}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-8 text-sm text-ink-2">
              {t.auth.hasAccount}{" "}
              <Link
                href="/login"
                className="text-ink underline underline-offset-4"
              >
                {t.common.login}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
