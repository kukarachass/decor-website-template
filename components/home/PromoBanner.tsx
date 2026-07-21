"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { products } from "@/lib/data/products";
import { ProductArt } from "@/components/ui/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useLocalizeProducts, useT } from "@/lib/i18n";

const ids = ["p-022", "p-031"];

export function PromoBanner() {
  const t = useT();
  const localize = useLocalizeProducts();
  const cards = localize(ids.map((id) => products.find((p) => p.id === id)!));

  return (
    <section className="container-x py-8 md:py-12">
      <Reveal>
        <div className="relative grid overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#F6E8E3_0%,#EFE6D6_45%,#E3EBE2_100%)] lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-10 px-7 py-12 sm:px-12 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-ink-2 uppercase">
              <Gift className="h-3.5 w-3.5 text-rose" />
              {t.home.bannerEyebrow}
            </span>
            <h2 className="mt-6 max-w-md font-display text-[2rem] leading-[1.08] sm:text-[2.5rem]">
              {t.home.bannerTitle}
            </h2>
            <p className="lead mt-5 max-w-sm text-sm leading-relaxed">
              {t.home.bannerText}
            </p>
            <Link
              href="/catalog?tag=bestseller"
              className={buttonStyles({ size: "lg", className: "mt-8" })}
            >
              {t.home.bannerCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative flex items-end gap-4 px-7 pb-10 sm:px-12 lg:items-center lg:justify-end lg:px-8 lg:py-10">
            {cards.map((p, i) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className={`group relative w-1/2 max-w-[15rem] overflow-hidden rounded-[24px] bg-white/50 p-3 shadow-[0_30px_60px_-40px_rgba(43,37,33,0.6)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 ${
                  i === 0 ? "lg:-mb-8" : "lg:-mt-8"
                }`}
              >
                <ProductArt
                  category={p.category}
                  seed={p.id}
                  className="aspect-[4/5] w-full rounded-[16px]"
                />
                <p className="mt-3 truncate font-title text-sm">{p.name}</p>
                <p className="text-[0.8rem] font-semibold">
                  {formatPrice(p.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
