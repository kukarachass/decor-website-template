"use client";

import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {categories, categoryMap} from "@/lib/data/categories";
import type {CategorySlug} from "@/lib/types";
import {ProductArt} from "@/components/ui/ProductArt";
import {SectionHeader} from "@/components/ui/SectionHeader";
import {Reveal} from "@/components/ui/Reveal";
import {cn} from "@/lib/utils";
import {useT} from "@/lib/i18n";

const featured: { slug: CategorySlug; className: string; big?: boolean }[] = [
    {slug: "polytsi", className: "md:col-span-2 md:row-span-2", big: true},
    {slug: "vazy", className: "md:col-span-1 md:row-span-1"},
    {slug: "tyulpany", className: "md:col-span-1 md:row-span-2"},
    {slug: "chashky", className: "md:col-span-1 md:row-span-1"},
];

const rest = categories.filter((c) => !featured.some((f) => f.slug === c.slug));

export function Categories() {
    const t = useT();

    return (
        <section id="categories" className="container-x scroll-mt-28 py-14 md:py-24">
            <SectionHeader
                eyebrow={t.home.categoriesEyebrow}
                title={t.home.categoriesTitle}
                description={t.home.categoriesText}
                href="/catalog"
            />

            <div
                className="mt-12 grid auto-rows-[14.5rem] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[15rem] md:grid-cols-4">
                {featured.map((f, i) => {
                    const c = categoryMap[f.slug];
                    const tc = t.categories[f.slug];
                    return (
                        <Reveal
                            key={f.slug}
                            delay={i * 90}
                            className={cn("group relative", f.className)}
                        >
                            <Link
                                href={`/catalog?category=${c.slug}`}
                                className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[28px] p-4 sm:p-5"
                            >
                                <ProductArt
                                    category={c.slug}
                                    seed={"cat-" + c.slug}
                                    className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                                    strokeWidth={0.85}
                                />
                                <div className="relative flex items-end justify-between gap-3">
                                    <div className="flex flex-col gap-1.5 rounded-3xl bg-paper/90 px-5 py-3.5 backdrop-blur-sm">
                                        <p
                                            className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase"
                                            style={{color: c.accent}}
                                        >
                                            {tc.caption}
                                        </p>
                                        <span
                                            className={cn(
                                                "font-[600] leading-none text-ink",
                                                f.big ? "text-xl sm:text-3xl" : "text-xl sm:text-2xl",
                                            )}
                                        >
                                            {tc.title}
                                        </span>
                                    </div>
                                    <span
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper transition-transform duration-500 group-hover:rotate-45"
                                        style={{background: c.accent}}
                                    >
                    <ArrowUpRight className="h-4 w-4"/>
                  </span>
                                </div>
                            </Link>
                        </Reveal>
                    );
                })}
            </div>

            <Reveal delay={120}>
                <div className="hide-scrollbar -mx-5 mt-4 flex gap-4 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
                    {rest.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/catalog?category=${c.slug}`}
                            className="group flex w-60 shrink-0 items-center gap-3 rounded-3xl border border-line bg-white/50 p-3 transition-all hover:-translate-y-0.5 hover:border-ink/25"
                        >
                            <ProductArt
                                category={c.slug}
                                seed={"mini-" + c.slug}
                                className="h-14 w-14 shrink-0 rounded-2xl"
                            />
                            <span className="min-w-0">
                <span className="block truncate font-title text-lg leading-tight">
                  {t.categories[c.slug].title}
                </span>
                <span
                    className="block truncate text-[0.7rem] font-medium"
                    style={{color: c.accent}}
                >
                  {t.categories[c.slug].caption}
                </span>
              </span>
                        </Link>
                    ))}
                    <div aria-hidden className="w-px shrink-0"/>
                </div>
            </Reveal>
        </section>
    );
}
