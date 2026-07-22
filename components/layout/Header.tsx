"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {Heart, Menu, Search, ShoppingBag, User} from "lucide-react";
import {Logo, LogoMark} from "@/components/ui/Logo";
import {categories} from "@/lib/data/categories";
import {cn} from "@/lib/utils";
import {useUI} from "@/lib/store/ui";
import {useAuth} from "@/lib/store/auth";
import {useWishlist} from "@/lib/store/wishlist";
import {useCartDetails, useHydrated} from "@/lib/hooks";
import {useT} from "@/lib/i18n";
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";

export function Header() {
    const t = useT();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const {count} = useCartDetails();
    const wishCount = useWishlist((s) => s.ids.length);
    const user = useAuth((s) => s.user);
    const logout = useAuth((s) => s.logout);
    const hydrated = useHydrated();
    const setCartOpen = useUI((s) => s.setCartOpen);
    const setMenuOpen = useUI((s) => s.setMenuOpen);
    const setSearchOpen = useUI((s) => s.setSearchOpen);

    const navLinks = [
        {href: "/catalog?sort=new", label: t.nav.new},
        {href: "/about", label: t.nav.about},
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMegaOpen(false);
        setAccountOpen(false);
    }, [pathname]);

    const iconBtn =
        "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-sand/70";

    return (
        <header className="sticky top-0 z-50">
            <div className="bg-ink text-paper/85">
                <div className="container-x flex h-9 items-center justify-between gap-4">
                    <span aria-hidden className="hidden w-16 sm:block"/>
                    <p className="flex-1 truncate text-center text-[0.66rem] font-medium tracking-[0.12em] uppercase sm:flex-none">
                        <span className="hidden sm:inline">{t.header.announce}</span>
                        <span className="sm:hidden">{t.header.announceShort}</span>
                    </p>
                    <LanguageSwitcher tone="dark" className="shrink-0 sm:w-16"/>
                </div>
            </div>

            <div
                className={cn(
                    "relative transition-all duration-500",
                    scrolled
                        ? "border-b border-line bg-paper/85 backdrop-blur-xl"
                        : "border-b border-transparent bg-paper/60 backdrop-blur-sm",
                )}
                onMouseLeave={() => setMegaOpen(false)}
            >
                <div className="container-x">
                    <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-20">
                        {/* ліва частина */}
                        <nav className="flex items-center gap-6">
                            <button
                                type="button"
                                aria-label={t.common.menu}
                                onClick={() => setMenuOpen(true)}
                                className={cn(iconBtn, "-ml-2 lg:hidden")}
                            >
                                <Menu className="h-5 w-5"/>
                            </button>
                            <div className="hidden items-center gap-6 lg:flex">
                                <button
                                    type="button"
                                    onMouseEnter={() => setMegaOpen(true)}
                                    onClick={() => setMegaOpen((v) => !v)}
                                    className={cn(
                                        "cursor-pointer text-[0.86rem] font-medium transition-colors",
                                        megaOpen ? "text-clay-2" : "text-ink hover:text-clay-2",
                                    )}
                                >
                                    {t.nav.catalog}
                                </button>
                                {navLinks.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        onMouseEnter={() => setMegaOpen(false)}
                                        className="link-underline text-[0.86rem] font-medium whitespace-nowrap text-ink"
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* логотип */}
                        <Link
                            href="/"
                            aria-label="Žoria Decor"
                            className="flex items-center justify-center"
                            onMouseEnter={() => setMegaOpen(false)}
                        >
                            <Logo
                                className="hidden w-[150px] text-ink transition-opacity hover:opacity-70 sm:block md:w-[186px]"/>
                            <LogoMark className="w-8 text-ink sm:hidden"/>
                        </Link>

                        {/* права частина */}
                        <div className="flex items-center justify-end gap-1 md:gap-2">
                            <button
                                type="button"
                                aria-label={t.common.search}
                                onClick={() => setSearchOpen(true)}
                                className={iconBtn}
                            >
                                <Search className="h-[1.15rem] w-[1.15rem]"/>
                            </button>

                            <Link
                                href="/profile?tab=wishlist"
                                aria-label={t.common.wishlist}
                                className={cn(iconBtn, "hidden sm:flex")}
                            >
                                <Heart className="h-[1.15rem] w-[1.15rem]"/>
                                {hydrated && wishCount > 0 && (
                                    <span
                                        className="absolute right-1 top-1 h-4 min-w-4 rounded-full bg-rose px-1 text-center text-[0.6rem] font-semibold leading-4 text-paper">
                    {wishCount}
                  </span>
                                )}
                            </Link>

                            <div
                                className="relative hidden sm:block"
                                onMouseEnter={() => setAccountOpen(true)}
                                onMouseLeave={() => setAccountOpen(false)}
                            >
                                <Link
                                    href={hydrated && user ? "/profile" : "/login"}
                                    aria-label={t.common.profile}
                                    className={iconBtn}
                                >
                                    <User className="h-[1.15rem] w-[1.15rem]"/>
                                </Link>
                                {accountOpen && (
                                    <div className="absolute right-0 top-full w-60 pt-2">
                                        <div
                                            className="overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[0_30px_60px_-30px_rgba(43,37,33,0.45)]">
                                            {hydrated && user ? (
                                                <>
                                                    <div className="px-3 py-2">
                                                        <p className="font-title text-lg leading-tight">
                                                            {user.firstName} {user.lastName}
                                                        </p>
                                                        <p className="truncate text-xs text-ink-3">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                    <div className="my-1 h-px bg-line"/>
                                                    <MenuLink href="/profile">{t.header.myOrders}</MenuLink>
                                                    <MenuLink href="/profile?tab=wishlist">
                                                        {t.common.wishlist}
                                                    </MenuLink>
                                                    <MenuLink href="/profile?tab=settings">
                                                        {t.header.personal}
                                                    </MenuLink>
                                                    {user.role === "admin" && (
                                                        <MenuLink href="/admin">
                                                            {t.header.adminPanel}
                                                        </MenuLink>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={logout}
                                                        className="w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm text-ink-3 transition-colors hover:bg-sand/70"
                                                    >
                                                        {t.common.logout}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="px-3 py-2">
                                                        <p className="font-title text-lg leading-tight">
                                                            {t.header.accountHi}
                                                        </p>
                                                        <p className="text-xs text-ink-3">
                                                            {t.header.accountHint}
                                                        </p>
                                                    </div>
                                                    <div className="my-1 h-px bg-line"/>
                                                    <MenuLink href="/login">{t.common.login}</MenuLink>
                                                    <MenuLink href="/register">
                                                        {t.common.register}
                                                    </MenuLink>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                aria-label={t.common.cart}
                                onClick={() => setCartOpen(true)}
                                className={cn(iconBtn, "-mr-2")}
                            >
                                <ShoppingBag className="h-[1.15rem] w-[1.15rem]"/>
                                {hydrated && count > 0 && (
                                    <span
                                        className="absolute right-0.5 top-1 h-4 min-w-4 rounded-full bg-ink px-1 text-center text-[0.6rem] font-semibold leading-4 text-paper">
                    {count}
                  </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* мега-меню */}
                <div
                    className={cn(
                        "absolute inset-x-0 top-full hidden overflow-hidden border-b border-line bg-paper/95 backdrop-blur-xl transition-all duration-500 lg:block",
                        megaOpen
                            ? "max-h-[520px] opacity-100"
                            : "pointer-events-none max-h-0 opacity-0",
                    )}
                >
                    <div className="container-x grid grid-cols-[1fr_260px] gap-10 py-10">
                        <div>
                            <p className="eyebrow mb-5">{t.common.categories}</p>
                            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                                {categories.map((c) => (
                                    <Link
                                        key={c.slug}
                                        href={`/catalog?category=${c.slug}`}
                                        className="group flex items-baseline justify-between gap-3 border-b border-line/70 py-2.5"
                                    >
                    <span
                        className="flex items-center gap-2 font-title text-lg text-ink transition-colors group-hover:text-clay-2">
                      <span
                          className="h-2 w-2 rounded-full"
                          style={{background: c.accent}}
                      />
                        {t.categories[c.slug].title}
                    </span>
                                        <span className="text-[0.7rem] text-ink-3">
                      {t.categories[c.slug].caption}
                    </span>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 flex gap-3">
                                {[
                                    {href: "/catalog", label: t.nav.allProducts},
                                    {href: "/catalog?tag=sale", label: t.common.sale},
                                    {href: "/delivery", label: t.nav.delivery},
                                    {href: "/contacts", label: t.nav.contacts},
                                ].map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="rounded-full border border-ink/15 px-5 py-2 text-[0.8rem] font-medium transition-colors hover:border-ink/40"
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link
                            href="/catalog?category=tyulpany"
                            className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-sand p-6"
                        >
                            <div
                                className="absolute inset-0 bg-[linear-gradient(160deg,#F8EDEB,#E6BFB9)] transition-transform duration-700 group-hover:scale-105"/>
                            <div className="relative">
                                <p className="eyebrow">{t.header.megaFavorite}</p>
                                <p className="mt-1 whitespace-pre-line font-display text-2xl leading-tight">
                                    {t.header.megaTulips}
                                </p>
                                <span
                                    className="mt-3 inline-block text-[0.8rem] font-medium text-ink-2 underline underline-offset-4">
                  {t.header.megaLook}
                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

function MenuLink({
                      href,
                      children,
                  }: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="block rounded-xl px-3 py-2 text-sm text-ink transition-colors hover:bg-sand/70"
        >
            {children}
        </Link>
    );
}
