"use client";

import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

export function NewArrivals() {
  const t = useT();
  const items = [...products]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 4);

  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeader
        eyebrow={t.home.newEyebrow}
        title={t.home.newTitle}
        description={t.home.newText}
        href="/catalog?sort=new"
      />

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 90} className="h-full">
            <ProductCard product={p} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
