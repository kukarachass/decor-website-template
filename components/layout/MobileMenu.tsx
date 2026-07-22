"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { useUI } from "@/lib/store/ui";
import { useAuth } from "@/lib/store/auth";
import { useHydrated, useLockBody } from "@/lib/hooks";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Logo";
import { buttonStyles } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useT } from "@/lib/i18n";

export function MobileMenu() {
  const t = useT();
  const open = useUI((s) => s.menuOpen);
  const setOpen = useUI((s) => s.setMenuOpen);
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const hydrated = useHydrated();
  useLockBody(open);

  const pages = [
    { href: "/catalog", label: t.nav.allProducts },
    { href: "/catalog?sort=new", label: t.common.new },
    { href: "/about", label: t.nav.about },
    { href: "/delivery", label: t.nav.delivery },
    { href: "/contacts", label: t.nav.contacts },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[86] lg:hidden",
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
          "absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <LogoMark className="w-7 text-ink" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-sand"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="eyebrow mb-3">{t.common.categories}</p>
          <ul className="mb-8">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog?category=${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line/70 py-3"
                >
                  <span className="flex items-center gap-3 font-title text-xl">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: c.accent }}
                    />
                    {t.categories[c.slug].title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-ink-3" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mb-3">{t.common.pages}</p>
          <ul className="space-y-1">
            {pages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-sm text-ink-2"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line px-6 py-5">
          {hydrated && user ? (
            <div className="space-y-3">
              <div>
                <p className="font-title text-lg leading-tight">
                  {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-xs text-ink-3">{user.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  {t.common.profile}
                </Link>
                {user.role === "admin" ? (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className={buttonStyles({ size: "sm" })}
                  >
                    {t.admin.short}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className={buttonStyles({ variant: "soft", size: "sm" })}
                  >
                    {t.common.logout}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={buttonStyles({ size: "sm" })}
              >
                {t.common.login}
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={buttonStyles({ variant: "outline", size: "sm" })}
              >
                {t.common.register}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
