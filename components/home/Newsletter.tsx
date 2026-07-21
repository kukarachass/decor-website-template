"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SubscribeForm } from "@/components/layout/SubscribeForm";
import { LogoMark } from "@/components/ui/Logo";
import { useT } from "@/lib/i18n";

export function Newsletter() {
  const t = useT();

  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center text-paper sm:px-14 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(217,165,160,0.5),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(147,166,140,0.45),transparent_70%)] blur-2xl"
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <LogoMark className="w-8 text-paper/70" />
            <h2 className="mt-6 whitespace-pre-line font-display text-[2rem] leading-[1.06] sm:text-[2.7rem]">
              {t.home.newsletterTitle}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/65">
              {t.home.newsletterText}
            </p>
            <SubscribeForm tone="dark" className="mt-8 w-full max-w-sm" />
            <p className="mt-10 text-[0.7rem] font-medium tracking-[0.16em] text-paper/40 uppercase">
              {t.home.newsletterNote}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
