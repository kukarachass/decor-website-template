"use client";

import Link from "next/link";
import {ArrowRight, ArrowUpRight, Banknote, Sparkles, Truck} from "lucide-react";
import {ProductArt} from "@/components/ui/ProductArt";
import {buttonStyles} from "@/components/ui/Button";
import {Reveal} from "@/components/ui/Reveal";
import {Stars} from "@/components/ui/Stars";
import {formatPrice} from "@/lib/utils";
import {products} from "@/lib/data/products";
import {categoryMap} from "@/lib/data/categories";
import type {Product} from "@/lib/types";
import {useLocalizeProducts, useT} from "@/lib/i18n";

const tileIds = ["p-010", "p-070", "p-020"];

export function Hero() {
    const t = useT();
    const localize = useLocalizeProducts();
    const tiles = localize(
        tileIds.map((id) => products.find((p) => p.id === id)!),
    );

    return (
        <section className="relative overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20">
            {/* кольорові плями на фоні */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,#F0D3CC,transparent_65%)] opacity-80 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-56 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,#D8E2D6,transparent_65%)] opacity-80 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/3 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#E7DCC4,transparent_70%)] opacity-70 blur-3xl"
            />

            <div className="container-x relative">
                <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
                    {/* текст */}
                    <div className="max-w-xl">
                        <Reveal>
              <span
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-ink-2 uppercase">
                <Sparkles className="h-3 w-3 text-clay-2"/>
                  {t.home.heroBadge}
              </span>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1 className="mt-6 font-display text-[2.7rem] leading-[1.02] text-ink sm:text-[3.4rem] lg:text-[3.9rem]">
                                {t.home.heroTitle1}
                                <br/>
                                {t.home.heroTitle2}{" "}
                                <span className="relative inline-block text-clay-2">
                  {t.home.heroTitle3}
                                    <svg
                                        viewBox="0 0 200 12"
                                        preserveAspectRatio="none"
                                        aria-hidden
                                        className="absolute -bottom-1 left-0 h-2.5 w-full text-blush"
                                    >
                    <path
                        d="M2 8c40-6 92-7 196-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                  </svg>
                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="lead mt-7 max-w-md text-[0.98rem] leading-relaxed">
                                {t.home.heroText}
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link href="/catalog" className={buttonStyles({size: "lg"})}>
                                    {t.home.heroCta}
                                    <ArrowRight className="h-4 w-4"/>
                                </Link>
                                <Link
                                    href="/catalog?sort=new"
                                    className={buttonStyles({variant: "outline", size: "lg"})}
                                >
                                    {t.home.heroCta2}
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={320}>
                            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/10 pt-6">
                                {t.home.stats.map((s) => (
                                    <div key={s.label}>
                                        <dt className="font-display text-2xl leading-none text-ink">
                                            {s.value}
                                        </dt>
                                        <dd className="mt-2 text-[0.72rem] leading-snug text-ink-3">
                                            {s.label}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>

                    {/* колаж із товарів */}
                    <Reveal delay={120} className="relative">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <HeroTile product={tiles[0]} big t={t}/>
                            <div className="flex flex-col gap-3 sm:gap-4">
                                <HeroTile product={tiles[1]} t={t}/>
                                <HeroTile product={tiles[2]} t={t}/>
                            </div>
                        </div>

                        {/* рейтинг */}
                        <div
                            className="absolute -left-3 top-6 hidden rounded-2xl border border-ink/8 bg-paper/90 px-4 py-3 text-center shadow-[0_24px_50px_-30px_rgba(43,37,33,0.6)] backdrop-blur sm:block lg:-left-8">
                            <Stars rating={4.9} className="text-honey" size={12}/>
                            <p className="mt-1 text-[0.7rem] font-medium text-ink-3">
                                4,9 · 1 200+
                            </p>
                        </div>

                        {/* обертальний бейдж */}
                        <div
                            className="absolute -left-14 top-1/2 hidden h-28 w-28 -translate-y-1/2 items-center justify-center xl:flex">
              <span className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                <ArrowUpRight className="h-4 w-4"/>
              </span>
                            <svg
                                viewBox="0 0 100 100"
                                className="h-full w-full animate-[spin_26s_linear_infinite] text-ink-2"
                                aria-hidden
                            >
                                <defs>
                                    <path
                                        id="badge-circle"
                                        d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                                        fill="none"
                                    />
                                </defs>
                                <text
                                    fill="currentColor"
                                    fontSize="8.4"
                                    fontWeight="600"
                                    letterSpacing="2.4"
                                    style={{textTransform: "uppercase"}}
                                >
                                    <textPath href="#badge-circle">
                                        {t.home.heroBadgeRing}
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </Reveal>
                </div>

                {/* промо-стрічка */}
                <Reveal delay={200}>
                    <div className="mt-12 grid gap-3 sm:grid-cols-3">
                        {[
                            {
                                bg: "bg-[#F5E4DF]",
                                icon: Sparkles,
                                color: "text-rose",
                                eyebrow: t.home.heroPromoEyebrow,
                                title: t.home.heroPromoTitle,
                                text: t.home.heroPromoText,
                            },
                            {
                                bg: "bg-[#E4EBE2]",
                                icon: Truck,
                                color: "text-sage",
                                eyebrow: t.common.delivery,
                                title: `${t.home.freeFrom} ${formatPrice(1500)}`,
                                text: t.home.marquee[0],
                            },
                            {
                                bg: "bg-[#EFE6D8]",
                                icon: Banknote,
                                color: "text-clay-2",
                                eyebrow: t.common.payment,
                                title: t.home.payCod,
                                text: t.home.payOnline,
                            },
                        ].map((c) => (
                            <div
                                key={c.eyebrow}
                                className={`flex items-center gap-4 rounded-3xl p-5 ${c.bg}`}
                            >
                <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/75 ${c.color}`}
                >
                  <c.icon className="h-[1.1rem] w-[1.1rem]"/>
                </span>
                                <div className="min-w-0">
                                    <p className="text-[0.66rem] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                                        {c.eyebrow}
                                    </p>
                                    <p className="font-title text-[1.02rem] leading-tight">
                                        {c.title}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs text-ink-2">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function HeroTile({
                      product,
                      big,
                      t,
                  }: {
    product: Product;
    big?: boolean;
    t: ReturnType<typeof useT>;
}) {
    const accent = categoryMap[product.category]?.accent;
    return (
        <Link
            href={`/product/${product.slug}`}
            className={`group relative overflow-hidden rounded-[26px] ${
                big
                    ? "h-full min-h-[19rem] sm:min-h-[26rem]"
                    : "min-h-[9rem] flex-1 sm:min-h-[12.5rem]"
            }`}
        >
            <ProductArt
                category={product.category}
                seed={product.id}
                className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                strokeWidth={big ? 0.7 : 1}
            />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <span className="min-w-0 flex-1 rounded-2xl bg-paper/90 px-3.5 py-2 backdrop-blur-sm">
          <span
              className="block text-[0.62rem] font-semibold tracking-[0.14em] uppercase"
              style={{color: accent}}
          >
            {t.categories[product.category]?.title}
          </span>
          <span className="hidden truncate font-title text-sm leading-tight sm:block">
            {product.name}
          </span>
        </span>
                <span
                    className="shrink-0 rounded-full bg-ink px-2.5 py-1.5 text-[0.7rem] font-semibold whitespace-nowrap text-paper">
          {formatPrice(product.price)}
        </span>
            </div>
        </Link>
    );
}
