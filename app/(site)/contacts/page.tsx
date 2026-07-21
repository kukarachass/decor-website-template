"use client";

import Link from "next/link";
import { Clock, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/layout/ContactForm";
import { ProductArt } from "@/components/ui/ProductArt";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useT } from "@/lib/i18n";

const contacts = [
  {
    icon: Phone,
    value: "+38 (067) 123-45-67",
    href: "tel:+380671234567",
    tint: "bg-[#E4EBE2] text-sage",
  },
  {
    icon: Mail,
    value: "hello@zoria.decor",
    href: "mailto:hello@zoria.decor",
    tint: "bg-[#EFE6D8] text-clay-2",
  },
  {
    icon: Instagram,
    value: "@zoria.decor",
    href: "https://instagram.com/zoria.decor",
    tint: "bg-[#F5E4DF] text-rose",
  },
  {
    icon: Send,
    value: "@zoria_decor",
    href: "https://t.me/zoria_decor",
    tint: "bg-[#E3E9EE] text-sky",
  },
];

export default function ContactsPage() {
  const t = useT();

  return (
    <>
      <DocumentTitle title={t.nav.contacts} />

      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(160deg,#FBF8F4,#F4EEE9)] py-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,#F0D3CC,transparent_65%)] opacity-70 blur-3xl"
        />
        <div className="container-x relative">
          <nav className="mb-6 flex items-center gap-2 text-[0.75rem] text-ink-3">
            <Link href="/" className="hover:text-ink">
              {t.common.home}
            </Link>
            <span>/</span>
            <span className="text-ink">{t.nav.contacts}</span>
          </nav>
          <h1 className="max-w-2xl font-display text-[2.4rem] leading-[1.05] sm:text-[3.2rem]">
            {t.pages.contactsTitle}
          </h1>
          <p className="lead mt-5 max-w-xl text-sm leading-relaxed">
            {t.pages.contactsLead}
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((c, i) => {
                const meta = t.pages.contacts[i];
                return (
                  <Reveal key={meta.label} delay={i * 80}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex h-full items-start gap-4 rounded-[26px] border border-line bg-white/50 p-6 transition-all hover:-translate-y-1 hover:border-ink/25"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${c.tint}`}
                      >
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.7rem] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                          {meta.label}
                        </span>
                        <span className="mt-1 block font-title text-lg leading-tight">
                          {c.value}
                        </span>
                        <span className="mt-1 block text-xs text-ink-3">
                          {meta.hint}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={200}>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-[26px] bg-[#EFE6D8] p-6">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-clay-2" />
                  <div className="text-sm">
                    <p className="font-title text-lg leading-tight">
                      {t.pages.hours}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-ink-2">
                      {t.pages.hoursText}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-[26px] bg-[#E4EBE2] p-6">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
                  <div className="text-sm">
                    <p className="font-title text-lg leading-tight">
                      {t.pages.address}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-ink-2">
                      {t.pages.addressText}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="relative mt-4 overflow-hidden rounded-[26px]">
                <ProductArt
                  category="organaizery"
                  seed="contacts-map"
                  className="aspect-[16/7] w-full"
                  strokeWidth={0.7}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-paper/90 px-5 py-2.5 text-[0.8rem] font-medium text-ink-2 backdrop-blur">
                    {t.pages.map}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
