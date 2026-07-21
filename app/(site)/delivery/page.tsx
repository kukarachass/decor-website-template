"use client";

import Link from "next/link";
import {
  Banknote,
  Clock,
  CreditCard,
  Inbox,
  Mail,
  PackageCheck,
  RefreshCw,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { buttonStyles } from "@/components/ui/Button";
import { deliveryOptions, paymentOptions } from "@/lib/data/delivery";
import { formatPrice } from "@/lib/utils";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useT } from "@/lib/i18n";

const icons = [Truck, Inbox, Mail];
const tints = [
  { bg: "bg-[#E4EBE2]", text: "text-sage" },
  { bg: "bg-[#E3E9EE]", text: "text-sky" },
  { bg: "bg-[#EFE6D8]", text: "text-clay-2" },
];
const perkIcons = [Clock, PackageCheck, RefreshCw];
const perkTints = ["bg-[#F5E4DF]", "bg-[#EFE6D8]", "bg-[#E4EBE2]"];

export default function DeliveryPage() {
  const t = useT();

  return (
    <>
      <DocumentTitle title={t.nav.delivery} />

      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(160deg,#FBF8F4,#F3EEE6)] py-14 md:py-20">
        <div className="container-x">
          <nav className="mb-6 flex items-center gap-2 text-[0.75rem] text-ink-3">
            <Link href="/" className="hover:text-ink">
              {t.common.home}
            </Link>
            <span>/</span>
            <span className="text-ink">{t.pages.deliveryTitle}</span>
          </nav>
          <h1 className="max-w-2xl font-display text-[2.4rem] leading-[1.05] sm:text-[3.2rem]">
            {t.pages.deliveryTitle}
          </h1>
          <p className="lead mt-5 max-w-xl text-sm leading-relaxed">
            {t.pages.deliveryLead}
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <p className="eyebrow mb-8">{t.pages.deliveryMethods}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {deliveryOptions.map((d, i) => {
            const Icon = icons[i];
            const meta = t.deliveryMethods[d.id];
            return (
              <Reveal key={d.id} delay={i * 90}>
                <div className="h-full rounded-[26px] border border-line bg-white/50 p-7">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${tints[i].bg} ${tints[i].text}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-6 font-title text-xl leading-tight">
                    {meta.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-2">{meta.caption}</p>
                  <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-ink-3">{t.pages.term}</dt>
                      <dd>{meta.eta}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-3">{t.pages.cost}</dt>
                      <dd className="font-semibold">{formatPrice(d.price)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-3">{t.pages.from1500}</dt>
                      <dd className="font-semibold text-sage">
                        {t.common.free}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="eyebrow mb-8 mt-16">{t.pages.paymentSection}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {paymentOptions.map((p, i) => {
            const Icon = p.id === "online" ? CreditCard : Banknote;
            const meta = t.paymentMethods[p.id];
            return (
              <Reveal key={p.id} delay={i * 90}>
                <div className="flex h-full items-start gap-5 rounded-[26px] border border-line bg-white/50 p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-ink-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-title text-xl leading-tight">
                      {meta.title}
                    </h2>
                    <p className="mt-2 text-sm text-ink-2">{meta.caption}</p>
                    <p className="mt-3 text-[0.8rem] text-ink-3">
                      {p.id === "online"
                        ? t.pages.payOnlineNote
                        : t.pages.payCodNote}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {t.pages.deliveryPerks.map((f, i) => {
            const Icon = perkIcons[i];
            return (
              <Reveal key={f.title} delay={i * 80}>
                <div
                  className={`flex items-start gap-4 rounded-[26px] p-6 ${perkTints[i]}`}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink-2" />
                  <div>
                    <p className="font-title text-lg leading-tight">
                      {f.title}
                    </p>
                    <p className="mt-1 text-xs text-ink-2">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="returns" className="container-x scroll-mt-28 pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">{t.pages.faqEyebrow}</p>
            <h2 className="font-display text-[1.9rem] leading-[1.1] sm:text-[2.2rem]">
              {t.pages.faqTitle}
            </h2>
            <p className="lead mt-4 text-sm">{t.pages.faqText}</p>
            <Link
              href="/contacts"
              className={buttonStyles({
                variant: "outline",
                className: "mt-6",
              })}
            >
              {t.pages.faqCta}
            </Link>
          </div>
          <Accordion items={t.pages.faq} />
        </div>
      </section>
    </>
  );
}
