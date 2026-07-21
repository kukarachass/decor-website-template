"use client";

import Link from "next/link";
import { Heart, Leaf, PackageCheck } from "lucide-react";
import { ProductArt } from "@/components/ui/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

const icons = [Heart, PackageCheck, Leaf];
const tints = ["bg-[#F5E4DF] text-rose", "bg-[#EFE6D8] text-clay-2", "bg-[#E4EBE2] text-sage"];

export function About() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FBF8F4_0%,#F4EFE7_40%,#FBF8F4_100%)] py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative mx-auto max-w-md">
            <div className="overflow-hidden rounded-[2rem] rounded-tl-[10rem]">
              <ProductArt
                category="polytsi"
                seed="about-1"
                className="aspect-[4/5] w-full"
                strokeWidth={0.7}
              />
            </div>
            <div className="absolute -bottom-8 -right-4 w-40 overflow-hidden rounded-[1.5rem] border-4 border-paper sm:-right-10 sm:w-52">
              <ProductArt
                category="chashky"
                seed="about-2"
                className="aspect-square w-full"
              />
            </div>
            <div className="absolute -left-4 top-10 hidden rounded-2xl bg-paper/90 px-4 py-3 shadow-[0_24px_50px_-30px_rgba(43,37,33,0.6)] backdrop-blur sm:block">
              <p className="font-display text-2xl leading-none">
                {t.home.aboutYears}
              </p>
              <p className="mt-1 text-[0.7rem] text-ink-3">
                {t.home.aboutYearsLabel}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-3">{t.home.aboutEyebrow}</p>
            <h2 className="max-w-md font-display text-[1.9rem] leading-[1.1] sm:text-[2.35rem] lg:text-[2.6rem]">
              {t.home.aboutTitle}
            </h2>
            <p className="lead mt-5 max-w-md text-sm leading-relaxed">
              {t.home.aboutText}
            </p>
          </Reveal>

          <ul className="mt-9 space-y-5">
            {t.home.values.map((v, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="li" key={v.title} delay={i * 90}>
                  <div className="flex gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tints[i]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-title text-lg leading-tight">
                        {v.title}
                      </p>
                      <p className="mt-1 max-w-sm text-sm text-ink-2">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={280}>
            <Link
              href="/about"
              className={buttonStyles({
                variant: "outline",
                className: "mt-9",
              })}
            >
              {t.home.aboutCta}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
