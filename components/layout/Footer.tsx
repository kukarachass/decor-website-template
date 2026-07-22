"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/lib/data/categories";
import { SubscribeForm } from "@/components/layout/SubscribeForm";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();

  const help = [
    { href: "/delivery", label: t.nav.delivery },
    { href: "/delivery#returns", label: t.footer.returns },
    { href: "/about", label: t.footer.aboutBrand },
    { href: "/contacts", label: t.nav.contacts },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-b from-sand/50 to-sand/80 pt-16">
      <div className="container-x">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
          <div>
            <p className="whitespace-pre-line font-display text-[1.75rem] leading-[1.15] text-ink">
              {t.footer.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              {t.footer.text}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://instagram.com/zoria.decor"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 transition-colors hover:border-ink/40 hover:bg-white/60"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/zoria_decor"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 transition-colors hover:border-ink/40 hover:bg-white/60"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">{t.common.catalog}</p>
            <ul className="space-y-2">
              {categories.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/catalog?category=${c.slug}`}
                    className="link-underline text-sm text-ink-2"
                  >
                    {t.categories[c.slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">{t.footer.help}</p>
            <ul className="space-y-2">
              {help.map((h) => (
                <li key={h.label}>
                  <Link
                    href={h.href}
                    className="link-underline text-sm text-ink-2"
                  >
                    {h.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm text-ink-2">
              <a
                href="tel:+380671234567"
                className="flex items-center gap-2 hover:text-ink"
              >
                <Phone className="h-3.5 w-3.5" /> +38 (067) 123-45-67
              </a>
              <a
                href="mailto:hello@zoria.decor"
                className="flex items-center gap-2 hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5" /> hello@zoria.decor
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">{t.footer.newsletter}</p>
            <p className="mb-4 text-sm text-ink-2">{t.footer.newsletterText}</p>
            <SubscribeForm />
            <div className="mt-10 flex flex-wrap gap-2">
              {t.footer.payments.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-ink/10 bg-paper/70 px-3 py-1.5 text-[0.68rem] font-medium tracking-wide text-ink-3"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* великий логотип-підпис */}
      <div className="container-x">
        <Logo className="w-full text-ink/[0.07]" />
      </div>

      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-2 border-t border-ink/10 py-6 text-[0.72rem] text-ink-3 sm:flex-row">
          <p>© {new Date().getFullYear()} Žoria Decor. {t.footer.rights}</p>
          <p>{t.footer.demo}</p>
        </div>
      </div>
    </footer>
  );
}
