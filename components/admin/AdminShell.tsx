"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useHydrated } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Logo";
import { buttonStyles } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

const nav: {
  href: string;
  key: "dashboard" | "orders" | "products";
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", key: "orders", icon: ShoppingBag },
  { href: "/admin/products", key: "products", icon: Package },
];

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useT();
  const pathname = usePathname();
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-display text-2xl text-ink-3">{t.common.loading}</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <LogoMark className="w-8 text-ink" />
        <h1 className="mt-8 font-display text-4xl">{t.admin.noAccess}</h1>
        <p className="mt-4 max-w-sm text-sm text-ink-2">
          {t.admin.noAccessText} <span className="text-ink">admin@</span>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/login?from=/admin" className={buttonStyles()}>
            {t.admin.loginAsAdmin}
          </Link>
          <Link href="/" className={buttonStyles({ variant: "outline" })}>
            {t.notFound.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-paper-2/50">
      {/* сайдбар */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-paper px-5 py-7 lg:flex">
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <LogoMark className="w-6 text-ink" />
          <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-ink-3 uppercase">
            {t.admin.title}
          </span>
        </Link>

        <nav className="mt-10 space-y-1">
          {nav.map((n) => {
            const active = n.exact
              ? pathname === n.href
              : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors",
                  active
                    ? "bg-ink text-paper"
                    : "text-ink-2 hover:bg-sand/70 hover:text-ink",
                )}
              >
                <n.icon className="h-4 w-4" />
                {t.admin.nav[n.key]}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-ink-2 transition-colors hover:bg-sand/70"
          >
            <ArrowUpRight className="h-4 w-4" />
            {t.admin.toSite}
          </Link>
          <div className="rounded-2xl bg-sand/60 p-4">
            <p className="font-display text-lg leading-tight">
              {user.firstName}
            </p>
            <p className="truncate text-[0.7rem] text-ink-3">{user.email}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-3 flex cursor-pointer items-center gap-2 text-[0.75rem] text-ink-3 transition-colors hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" />
              {t.common.logout}
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* мобільна навігація */}
        <div className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Link href="/admin" className="flex items-center gap-2">
              <LogoMark className="w-5 text-ink" />
              <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-ink-3 uppercase">
                {t.admin.short}
              </span>
            </Link>
            <Link href="/" className="text-[0.75rem] text-ink-3">
              {t.admin.toSiteShort}
            </Link>
          </div>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">
            {nav.map((n) => {
              const active = n.exact
                ? pathname === n.href
                : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[0.75rem] whitespace-nowrap",
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/12 text-ink-2",
                  )}
                >
                  {t.admin.nav[n.key]}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
