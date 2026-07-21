"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Banknote,
  Check,
  ChevronDown,
  Heart,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks";
import { categoryMap } from "@/lib/data/categories";
import { cn, formatPrice } from "@/lib/utils";
import { ProductArt } from "@/components/ui/ProductArt";
import { TagBadge } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { QtyInput } from "@/components/ui/QtyInput";
import { Button, buttonStyles } from "@/components/ui/Button";
import { ProductRail } from "@/components/product/ProductRail";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocalizedProduct, useT } from "@/lib/i18n";
import { DocumentTitle } from "@/components/ui/DocumentTitle";

export function ProductView({ slug }: { slug: string }) {
  const t = useT();
  const products = useShop((s) => s.products);
  const raw = products.find((p) => p.slug === slug);
  const product = useLocalizedProduct(raw ?? products[0]);
  const add = useCart((s) => s.add);
  const notify = useUI((s) => s.notify);
  const wishIds = useWishlist((s) => s.ids);
  const toggleWish = useWishlist((s) => s.toggle);
  const hydrated = useHydrated();

  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [image, setImage] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>("specs");

  const related = useMemo(() => {
    if (!raw) return [];
    const sameCategory = products.filter(
      (p) => p.category === raw.category && p.id !== raw.id,
    );
    const others = products.filter(
      (p) => p.category !== raw.category && p.rating >= 4.8,
    );
    return [...sameCategory, ...others].slice(0, 8);
  }, [products, raw]);

  if (!raw) {
    return (
      <div className="container-x py-32 text-center">
        <p className="font-display text-4xl">{t.product.notFound}</p>
        <p className="lead mt-4 text-sm">{t.product.notFoundText}</p>
        <Link href="/catalog" className={cn(buttonStyles(), "mt-8")}>
          {t.common.toCatalog}
        </Link>
      </div>
    );
  }

  const category = categoryMap[product.category];
  const catText = t.categories[product.category];
  const color = product.colors[colorIndex] ?? product.colors[0];
  const colorLabel = t.colors[color?.name] ?? color?.name;
  const inWish = hydrated && wishIds.includes(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const sections = [
    {
      id: "specs",
      title: t.product.specs,
      content: (
        <dl className="space-y-3">
          {product.specs.map((s) => (
            <div
              key={s.label}
              className="flex justify-between gap-6 border-b border-line/70 pb-3 text-sm last:border-0"
            >
              <dt className="text-ink-3">{s.label}</dt>
              <dd className="text-right text-ink-2">{s.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "delivery",
      title: t.product.delivery,
      content: (
        <ul className="space-y-3 text-sm text-ink-2">
          {t.product.deliveryList.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "returns",
      title: t.product.returns,
      content: (
        <p className="text-sm leading-relaxed text-ink-2">
          {t.product.returnsText}
        </p>
      ),
    },
  ];

  return (
    <>
      <DocumentTitle title={product.name} />
      <div className="container-x pt-8">
        <nav className="flex flex-wrap items-center gap-2 text-[0.75rem] text-ink-3">
          <Link href="/" className="hover:text-ink">
            {t.common.home}
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-ink">
            {t.common.catalog}
          </Link>
          <span>/</span>
          <Link
            href={`/catalog?category=${product.category}`}
            className="hover:text-ink"
          >
            {catText?.title}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="container-x grid gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-14">
        {/* галерея */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="hide-scrollbar flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
              {[0, 1, 2, 3].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setImage(v)}
                  className={cn(
                    "shrink-0 overflow-hidden rounded-2xl border-2 transition-colors",
                    image === v ? "border-ink" : "border-transparent",
                  )}
                  aria-label={`${t.product.photo} ${v + 1}`}
                >
                  <ProductArt
                    category={product.category}
                    seed={product.id}
                    variant={v}
                    className="h-20 w-16 sm:h-24 sm:w-full"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1">
              <div className="overflow-hidden rounded-[2rem]">
                <ProductArt
                  key={image}
                  category={product.category}
                  seed={product.id}
                  variant={image}
                  className="aspect-[4/5] w-full"
                  strokeWidth={0.6}
                />
              </div>
              <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                {product.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleWish(product.id);
                  notify(
                    inWish ? t.product.removedFromWish : t.product.addedToWish,
                    product.name,
                  );
                }}
                aria-label={t.common.wishlist}
                className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-paper/85 backdrop-blur transition-colors hover:bg-paper"
              >
                <Heart
                  className={cn(
                    "h-4.5 w-4.5",
                    inWish ? "fill-rose text-rose" : "text-ink-2",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* інформація */}
        <div>
          <p
            className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase"
            style={{ color: category?.accent }}
          >
            {catText?.title}
          </p>
          <h1 className="mt-3 font-display text-[2.2rem] leading-[1.05] sm:text-[2.7rem]">
            {product.name}
          </h1>
          <p className="lead mt-3 text-sm">{product.subtitle}</p>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} className="text-honey" size={14} />
            <span className="text-xs text-ink-3">
              {product.rating} · {product.reviews} {t.product.reviews}
            </span>
          </div>

          <div className="mt-7 flex items-end gap-3">
            <span className="font-display text-[2.3rem] leading-none">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="pb-1 text-base text-ink-3 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="mb-1 rounded-full bg-rose px-2.5 py-1 text-[0.68rem] font-bold text-paper">
                  −{discount}%
                </span>
              </>
            )}
          </div>

          <p className="lead mt-6 max-w-lg text-sm leading-relaxed">
            {product.description}
          </p>

          {/* кольори */}
          <div className="mt-8">
            <p className="mb-3 text-[0.74rem] font-semibold tracking-[0.12em] text-ink-3 uppercase">
              {t.product.color}:{" "}
              <span className="text-ink">{colorLabel}</span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIndex(i)}
                  title={t.colors[c.name] ?? c.name}
                  className={cn(
                    "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all",
                    colorIndex === i
                      ? "border-ink ring-2 ring-ink/12"
                      : "border-ink/15 hover:border-ink/40",
                  )}
                  style={{ background: c.hex }}
                >
                  {colorIndex === i && (
                    <Check className="h-4 w-4 text-ink/70" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* розміри */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-[0.74rem] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                {t.product.size}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSizeIndex(i)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-[0.84rem] font-medium transition-all",
                      sizeIndex === i
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/15 hover:border-ink/40",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* дії */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <QtyInput value={qty} onChange={setQty} max={product.stock || 1} />
            <Button
              size="lg"
              disabled={product.stock <= 0}
              className="min-w-52 flex-1"
              onClick={() => {
                add(
                  product.id,
                  raw.sizes
                    ? `${raw.colors[colorIndex]?.name} · ${raw.sizes[sizeIndex]}`
                    : (raw.colors[colorIndex]?.name ?? "—"),
                  qty,
                );
                notify(t.product.addedToCart, `${product.name} · ${qty}`);
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              {product.stock > 0 ? t.product.addToCart : t.product.soldOut}
            </Button>
          </div>

          <p className="mt-4 text-xs text-ink-3">
            {product.stock > 0 ? (
              <>
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-sage align-middle" />
                {t.product.inStock} · {product.stock} {t.product.inStockUnits}
              </>
            ) : (
              t.product.soldOutNote
            )}
          </p>

          {/* переваги */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[Truck, Banknote, RefreshCw].map((Icon, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white/40 px-4 py-3 text-xs text-ink-2"
              >
                <Icon className="h-4 w-4 shrink-0 text-clay-2" />
                {t.product.perks[i]}
              </li>
            ))}
          </ul>

          {/* особливості */}
          <ul className="mt-8 space-y-2.5">
            {product.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-ink-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                {f}
              </li>
            ))}
          </ul>

          {/* акордеон */}
          <div className="mt-10 border-t border-line">
            {sections.map((s) => (
              <div key={s.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(openSection === s.id ? null : s.id)
                  }
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-title text-lg">{s.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300",
                      openSection === s.id && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    openSection === s.id
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">{s.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* рекомендації */}
      {related.length > 0 && (
        <section className="container-x py-16 md:py-24">
          <SectionHeader
            eyebrow={t.product.relatedEyebrow}
            title={t.product.relatedTitle}
            description={t.product.relatedText}
            href={`/catalog?category=${product.category}`}
            linkLabel={t.product.relatedCta}
            className="mb-12"
          />
          <ProductRail products={related} />
        </section>
      )}
    </>
  );
}
