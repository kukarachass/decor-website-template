"use client";

import {products} from "@/lib/data/products";
import {ProductRail} from "@/components/product/ProductRail";
import {SectionHeader} from "@/components/ui/SectionHeader";
import {useT} from "@/lib/i18n";

export function Bestsellers() {
    const t = useT();
    const items = products.filter((p) => p.tags.includes("bestseller"));

    return (
        <section className="container-x py-14 md:py-24">
            <SectionHeader
                eyebrow={t.home.bestsellersEyebrow}
                title={t.home.bestsellersTitle}
                description={t.home.bestsellersText}
                href="/catalog?tag=bestseller"
                className="mb-12"
            />
            <ProductRail products={items}/>
        </section>
    );
}
