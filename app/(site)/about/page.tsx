"use client";

import Link from "next/link";
import { Heart, Leaf, PackageCheck, Sparkles } from "lucide-react";
import { ProductArt } from "@/components/ui/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { Marquee } from "@/components/home/Marquee";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useT } from "@/lib/i18n";

const icons = [Heart, PackageCheck, Leaf, Sparkles];
const tints = [
  "bg-[#F5E4DF] text-rose",
  "bg-[#EFE6D8] text-clay-2",
  "bg-[#E4EBE2] text-sage",
  "bg-[#E9E3EF] text-lilac",
];

export default function AboutPage() {
  const t = useT();

  return (
    <>
      <DocumentTitle title={t.nav.about} />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,#F0D3CC,transparent_65%)] opacity-70 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,#D8E2D6,transparent_65%)] opacity-70 blur-3xl"
        />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow mb-4">{t.pages.aboutEyebrow}</p>
            <h1 className="max-w-3xl font-display text-[2.5rem] leading-[1.04] sm:text-[3.4rem] lg:text-[4rem]">
              {t.pages.aboutTitle}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-8 max-w-xl text-[0.98rem] leading-relaxed">
              {t.pages.aboutLead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal className="sm:col-span-2">
            <div className="overflow-hidden rounded-[2rem] rounded-tr-[10rem]">
              <ProductArt
                category="polytsi"
                seed="about-hero"
                className="aspect-[16/10] w-full"
                strokeWidth={0.6}
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-[2rem]">
              <ProductArt
                category="chashky"
                seed="about-hero-2"
                className="aspect-[4/5] w-full sm:aspect-auto sm:h-full"
                strokeWidth={0.8}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-[1.9rem] leading-[1.1] sm:text-[2.35rem]">
              {t.pages.aboutHow}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="lead space-y-5 text-sm leading-relaxed">
              {t.pages.aboutParas.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.pages.aboutValues.map((v, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-[26px] border border-line bg-white/50 p-7 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(43,37,33,0.45)]">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${tints[i]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-5 font-title text-lg leading-tight">
                    {v.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[linear-gradient(120deg,#F5EFE6,#EFE9E2)] py-16 md:py-20">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.pages.aboutNumbers.map((n, i) => (
            <Reveal key={n.label} delay={i * 80}>
              <p className="font-display text-[2.4rem] leading-none">
                {n.value}
              </p>
              <p className="mt-3 text-sm text-ink-3">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-display text-[1.9rem] leading-[1.1] sm:text-[2.5rem]">
            {t.pages.aboutCtaTitle}
          </h2>
          <p className="lead mt-5 max-w-md text-sm">{t.pages.aboutCtaText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/catalog" className={buttonStyles({ size: "lg" })}>
              {t.common.toCatalog}
            </Link>
            <Link
              href="/contacts"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              {t.pages.aboutCtaLink}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
