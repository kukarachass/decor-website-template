"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, RefreshCw, Truck } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

const trustIcons = [Truck, RefreshCw, Gift];

export function Hero() {
  const t = useT();

  return (
    <section className="relative isolate w-full overflow-hidden">
      <Image
        src="/hero-living-room.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* затемнення: знизу — на мобільному, зліва — на десктопі */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(43,37,33,0.88),rgba(43,37,33,0.6)_55%,rgba(43,37,33,0.4))] md:bg-[linear-gradient(to_right,rgba(43,37,33,0.88),rgba(43,37,33,0.62)_45%,rgba(43,37,33,0.12)_88%)]"
      />

      <div className="container-x relative flex min-h-[30rem] items-center py-16 sm:min-h-[34rem] lg:min-h-[40rem] lg:py-20">
        <div className="max-w-xl animate-rise text-paper">
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-paper uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            {t.home.heroBadge}
          </span>

          <h1 className="mt-6 font-display text-[2.4rem] leading-[1.04] text-paper sm:text-[3rem] lg:text-[3.6rem]">
            {t.home.heroTitle1} {t.home.heroTitle2}{" "}
            <span className="text-clay">{t.home.heroTitle3}</span>
          </h1>

          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-paper/85">
            {t.home.heroText}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/catalog"
              className={buttonStyles({ variant: "light", size: "lg" })}
            >
              {t.home.heroCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/catalog?sort=new"
              className="group inline-flex items-center gap-2 text-[0.9rem] font-semibold text-paper"
            >
              <span className="link-underline">{t.home.heroCta2}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-paper/20 pt-5 lg:mt-10 lg:pt-6">
            {t.home.heroTrust.map((label, i) => {
              const Icon = trustIcons[i];
              return (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[0.8rem] font-medium text-paper/85"
                >
                  <Icon className="h-4 w-4 shrink-0 text-clay" />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
