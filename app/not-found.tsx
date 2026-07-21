"use client";

import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { ProductArt } from "@/components/ui/ProductArt";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const t = useT();

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,#F0D3CC,transparent_65%)] opacity-70 blur-3xl"
      />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <LogoMark className="w-8 text-ink" />
          <p className="mt-10 font-display text-[6rem] leading-none text-clay/50 sm:text-[8rem]">
            404
          </p>
          <h1 className="mt-4 max-w-md font-display text-[2rem] leading-[1.1] sm:text-[2.6rem]">
            {t.notFound.title}
          </h1>
          <p className="lead mt-5 max-w-sm text-sm leading-relaxed">
            {t.notFound.text}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className={buttonStyles({ size: "lg" })}>
              {t.notFound.home}
            </Link>
            <Link
              href="/catalog"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              {t.common.toCatalog}
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-t-[14rem] rounded-b-[2rem]">
          <ProductArt
            category="vazy"
            seed="404"
            className="aspect-[4/5] w-full"
            strokeWidth={0.6}
          />
        </div>
      </div>
    </main>
  );
}
