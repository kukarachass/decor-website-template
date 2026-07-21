"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useUI } from "@/lib/store/ui";
import { Input, Label, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { LogoMark } from "@/components/ui/Logo";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useT } from "@/lib/i18n";

function LoginForm() {
  const t = useT();
  const router = useRouter();
  const params = useSearchParams();
  const login = useAuth((s) => s.login);
  const notify = useUI((s) => s.notify);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirect = params.get("from") ?? "/profile";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error ?? t.auth.errLogin);
      return;
    }
    notify(
      t.auth.welcome,
      email.toLowerCase().startsWith("admin") ? t.auth.welcomeAdmin : undefined,
    );
    router.push(email.toLowerCase().startsWith("admin") ? "/admin" : redirect);
  };

  return (
    <>
      <DocumentTitle title={t.common.login} />
      <section className="container-x py-12 md:py-20">
      <div className="grid overflow-hidden rounded-[2.5rem] border border-line bg-white/40 lg:grid-cols-2">
        {/* форма */}
        <div className="px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto max-w-sm">
            <LogoMark className="w-7 text-ink" />
            <h1 className="mt-8 font-display text-[2.4rem] leading-[1.05]">
              {t.auth.loginTitle}
            </h1>
            <p className="mt-3 text-sm text-ink-2">
              {t.auth.loginText}
            </p>

            <form onSubmit={submit} className="mt-9 space-y-5">
              <div>
                <Label htmlFor="email">{t.checkout.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <span className="mb-2 text-[0.7rem] text-ink-3">
                    {t.auth.forgot}
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••"
                  autoComplete="current-password"
                />
                <FieldError>{error}</FieldError>
              </div>

              <Button type="submit" size="lg" full>
                {t.common.login}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex gap-3 rounded-2xl bg-sand/60 px-5 py-4 text-[0.78rem] leading-relaxed text-ink-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-clay-2" />
              <span>
                {t.auth.demoNote}
                <br />
                {t.auth.demoAdmin}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@zoria.ua");
                    setPassword("zoria2026");
                  }}
                  className="cursor-pointer text-ink underline underline-offset-4"
                >
                  admin@zoria.ua
                </button>
                .
              </span>
            </div>

            <p className="mt-8 text-sm text-ink-2">
              {t.auth.noAccount}{" "}
              <Link
                href="/register"
                className="text-ink underline underline-offset-4"
              >
                {t.auth.signUp}
              </Link>
            </p>
          </div>
        </div>

        {/* декор */}
        <div className="relative hidden lg:block">
          <ProductArt
            category="vazy"
            seed="login-art"
            className="absolute inset-0 h-full w-full"
            strokeWidth={0.6}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            <p className="max-w-xs font-display text-3xl leading-tight text-ink">
              {t.auth.quote}
            </p>
            <p className="mt-4 text-[0.72rem] tracking-[0.18em] text-ink-3 uppercase">
              Žoria Decor
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container-x py-24" />}>
      <LoginForm />
    </Suspense>
  );
}
