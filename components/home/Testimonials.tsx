"use client";

import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useT } from "@/lib/i18n";

const ratings = [5, 5, 4.8];
const tints = ["bg-[#F5E4DF]", "bg-[#E4EBE2]", "bg-[#E9E3EF]"];

export function Testimonials() {
  const t = useT();

  return (
    <section className="bg-paper-2/70 py-14 md:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow={t.home.reviewsEyebrow}
          title={t.home.reviewsTitle}
          align="center"
          description={t.home.reviewsText}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.home.reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <figure className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-paper p-7">
                <Quote
                  className="absolute -right-2 -top-2 h-16 w-16 text-ink/[0.05]"
                  aria-hidden
                />
                <Stars rating={ratings[i]} className="text-honey" size={13} />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink-2">
                  «{r.text}»
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg ${tints[i]}`}
                  >
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">
                      {r.name}
                    </span>
                    <span className="block text-[0.72rem] text-ink-3">
                      {r.city}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
