"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductArt } from "@/components/ui/ProductArt";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();

  return (
    <section className="container-x pt-6 pb-12 md:pt-8 md:pb-16">
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

          <div className="relative lg:min-h-[27rem]">
            {/* текст */}
            <div className="px-6 pt-12 sm:px-10 sm:pt-14 lg:max-w-[54%] lg:py-16 lg:pl-14 xl:py-20">
              <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-clay-2 uppercase">
                {t.home.heroBadge}
              </p>

              <h1 className="mt-5 font-display text-[2.4rem] leading-[1.04] text-ink sm:text-[3rem] lg:text-[3.4rem]">
                {t.home.heroTitle1} {t.home.heroTitle2}{" "}
                <span className="text-clay-2">{t.home.heroTitle3}</span>
              </h1>

              <p className="lead mt-5 max-w-sm text-[0.95rem] leading-relaxed">
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
            </div>

            {/* візуал: на десктопі — арка, що виростає з нижнього краю банера */}
            <div className="px-6 pb-10 pt-10 sm:px-10 lg:absolute lg:bottom-0 lg:right-10 lg:top-10 lg:w-[30%] lg:px-0 lg:pb-0 lg:pt-0 xl:right-14">
              <div className="mx-auto h-full w-full max-w-[19rem] overflow-hidden rounded-t-[12rem] rounded-b-[1.5rem] lg:max-w-none lg:rounded-b-none lg:rounded-t-[16rem]">
                <ProductArt
                  category="vazy"
                  seed="hero-banner"
                  className="aspect-[4/5] w-full lg:h-full lg:aspect-auto"
                  strokeWidth={0.55}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
