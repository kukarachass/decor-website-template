"use client";

import Link from "next/link";
import { Banknote, CreditCard, Inbox, Mail, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { deliveryOptions } from "@/lib/data/delivery";
import { formatPrice } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const icons = [Truck, Inbox, Mail];
const tints = [
  { bg: "bg-[#E4EBE2]", text: "text-sage" },
  { bg: "bg-[#E3E9EE]", text: "text-sky" },
  { bg: "bg-[#EFE6D8]", text: "text-clay-2" },
];

export function Delivery() {
  const t = useT();

  return (
    <section className="container-x py-14 md:py-24">
      <SectionHeader
        eyebrow={t.home.deliveryEyebrow}
        title={t.home.deliveryTitle}
        description={t.home.deliveryText}
        href="/delivery"
        linkLabel={t.home.deliveryCta}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {deliveryOptions.map((d, i) => {
          const Icon = icons[i];
          const meta = t.deliveryMethods[d.id];
          return (
            <Reveal key={d.id} delay={i * 90}>
              <div className="group h-full rounded-[26px] border border-line bg-white/50 p-7 transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_60px_-40px_rgba(43,37,33,0.5)]">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${tints[i].bg} ${tints[i].text}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-title text-xl leading-tight">
                  {meta.title}
                </h3>
                <p className="mt-2 text-sm text-ink-2">{meta.caption}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="text-ink-3">{meta.eta}</span>
                  <span className="font-semibold">{formatPrice(d.price)}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200}>
        <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-[26px] bg-ink p-7 text-paper sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-3 text-sm">
              <CreditCard className="h-5 w-5 text-paper/60" />
              {t.home.payOnline}
            </span>
            <span className="flex items-center gap-3 text-sm">
              <Banknote className="h-5 w-5 text-paper/60" />
              {t.home.payCod}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-sm text-paper/70">
              {t.home.freeFrom} {formatPrice(1500)}
            </p>
            <Link
              href="/catalog"
              className="rounded-full bg-paper px-5 py-2.5 text-[0.82rem] font-semibold text-ink transition-opacity hover:opacity-85"
            >
              {t.common.toCatalog}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
