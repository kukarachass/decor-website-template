"use client";

import Link from "next/link";
import { ArrowRight, Gift, RefreshCw, Star, Truck } from "lucide-react";
import { ProductArt } from "@/components/ui/ProductArt";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { useLocalizeProducts, useT } from "@/lib/i18n";

/** Товари у колажі банера: висока ваза + тюльпани поруч. */
const heroIds = ["p-010", "p-020"];
const trustIcons = [Truck, RefreshCw, Gift];

export function Hero() {
  const t = useT();
  const localize = useLocalizeProducts();
  const [main, side] = localize(
    heroIds.map((id) => products.find((p) => p.id === id)!),
  );

  return (
    <section className="container-x pt-4 pb-12 md:pt-6 md:pb-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(115deg,#F7EFE9_0%,#F3EEE6_45%,#E8EFE9_100%)] md:rounded-[2.75rem]">
          {/* мʼяке світло */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,#EFD6CE,transparent_70%)] opacity-70 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,#DCE7DC,transparent_70%)] opacity-70 blur-3xl"
          />
          <div className="grain absolute inset-0" aria-hidden />

          <div className="relative grid items-center gap-9 px-6 pt-10 pb-10 sm:px-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-8 lg:px-14 lg:py-16 xl:gap-12 xl:py-20">
            {/* текст */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-ink-2 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                {t.home.heroBadge}
              </span>

              <h1 className="mt-6 font-display text-[2.4rem] leading-[1.04] text-ink sm:text-[3rem] lg:text-[3.3rem] xl:text-[3.6rem]">
                {t.home.heroTitle1} {t.home.heroTitle2}{" "}
                <span className="text-clay-2">{t.home.heroTitle3}</span>
              </h1>

              <p className="lead mt-5 max-w-md text-[0.95rem] leading-relaxed">
                {t.home.heroText}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/catalog" className={buttonStyles({ size: "lg" })}>
                  {t.home.heroCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/catalog?sort=new"
                  className="group inline-flex items-center gap-2 text-[0.9rem] font-semibold text-ink"
                >
                  <span className="link-underline">{t.home.heroCta2}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/70 pt-5 lg:mt-9 lg:pt-6">
                {t.home.heroTrust.map((label, i) => {
                  const Icon = trustIcons[i];
                  return (
                    <li
                      key={label}
                      className="flex items-center gap-2 text-[0.8rem] font-medium text-ink-2"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-clay-2" />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* колаж: арка з головним товаром + рейтинг і товар-компаньйон */}
            <div className="mx-auto grid w-full max-w-[21rem] grid-cols-2 gap-3 sm:max-w-[24rem] sm:gap-4 lg:max-w-[30rem]">
              <Link
                href={`/product/${main.slug}`}
                className="group mt-8 rounded-t-[8rem] rounded-b-[1.5rem] bg-paper/80 p-2.5 shadow-[0_45px_80px_-45px_rgba(43,37,33,0.75)] ring-1 ring-white/70 backdrop-blur-sm sm:mt-10"
              >
                <ProductArt
                  category={main.category}
                  seed={main.id}
                  /* найнасиченіший із варіантів тону — щоб арка не зливалася з банером */
                  variant={3}
                  className="aspect-[3/4] w-full rounded-t-[7rem] rounded-b-[1rem] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  strokeWidth={0.9}
                />
                <p className="mt-2.5 px-1 text-[0.55rem] font-semibold tracking-[0.14em] text-clay-2 uppercase">
                  {t.home.heroPick}
                </p>
                <p className="line-clamp-2 px-1 font-title text-[0.82rem] leading-snug">
                  {main.name}
                </p>
                <p className="mb-1 px-1 text-[0.78rem] font-semibold">
                  {formatPrice(main.price)}
                </p>
              </Link>

              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="rounded-[1.25rem] bg-paper/85 px-3.5 py-3 shadow-[0_25px_50px_-35px_rgba(43,37,33,0.7)] ring-1 ring-white/70 backdrop-blur-sm">
                  <p className="flex items-center gap-2">
                    <span className="flex shrink-0 gap-px text-honey">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-2.5 w-2.5 fill-current" />
                      ))}
                    </span>
                    <span className="text-[0.72rem] leading-none font-semibold text-ink">
                      {t.home.heroRating}
                    </span>
                  </p>
                  <p className="mt-1.5 text-[0.62rem] leading-tight text-ink-3">
                    {t.home.heroReviews}
                  </p>
                </div>

                <Link
                  href={`/product/${side.slug}`}
                  className="group animate-float-slow rounded-[1.5rem] bg-paper/80 p-2.5 shadow-[0_35px_70px_-45px_rgba(43,37,33,0.7)] ring-1 ring-white/70 backdrop-blur-sm motion-reduce:animate-none"
                >
                  <ProductArt
                    category={side.category}
                    seed={side.id}
                    className="aspect-[4/5] w-full rounded-[1rem]"
                    strokeWidth={1}
                  />
                  <p className="mt-2.5 line-clamp-2 px-1 font-title text-[0.82rem] leading-snug">
                    {side.name}
                  </p>
                  <p className="mb-1 px-1 text-[0.78rem] font-semibold text-clay-2">
                    {formatPrice(side.price)}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
