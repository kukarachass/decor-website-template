"use client";

import Link from "next/link";
import {Heart, ShoppingBag} from "lucide-react";
import type {Product} from "@/lib/types";
import {categoryMap} from "@/lib/data/categories";
import {cn, formatPrice} from "@/lib/utils";
import {ProductArt} from "@/components/ui/ProductArt";
import {TagBadge} from "@/components/ui/Badge";
import {useCart} from "@/lib/store/cart";
import {useWishlist} from "@/lib/store/wishlist";
import {useUI} from "@/lib/store/ui";
import {useHydrated} from "@/lib/hooks";
import {useLocalizedProduct, useT} from "@/lib/i18n";

export function WishButton({productId, className}: { productId: string; className?: string; }) {
    const t = useT();
    const ids = useWishlist((s) => s.ids);
    const toggle = useWishlist((s) => s.toggle);
    const notify = useUI((s) => s.notify);
    const hydrated = useHydrated();
    const active = hydrated && ids.includes(productId);

    return (
        <button
            type="button"
            aria-label={t.common.wishlist}
            onClick={(e) => {
                e.preventDefault();
                toggle(productId);
                notify(active ? t.product.removedFromWish : t.product.addedToWish);
            }}
            className={cn(
                "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-paper/85 backdrop-blur transition-all duration-300 hover:bg-paper",
                className,
            )}
        >
            <Heart
                className={cn(
                    "h-4 w-4 transition-colors",
                    active ? "fill-rose text-rose" : "text-ink-2",
                )}
            />
        </button>
    );
}

export function ProductCard({product: raw, aspect = "aspect-[4/5]", className}: { product: Product; aspect?: string; className?: string; }) {
    const t = useT();
    const product = useLocalizedProduct(raw);
    const add = useCart((s) => s.add);
    const notify = useUI((s) => s.notify);
    const accent = categoryMap[product.category]?.accent ?? "#C2A288";
    const soldOut = product.stock <= 0;

    return (
        <article className={cn("group relative flex flex-col", className)}>
            <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
                <div
                    className={cn(
                        "relative overflow-hidden rounded-[26px] bg-sand",
                        aspect,
                    )}
                >
                    <ProductArt
                        category={product.category}
                        seed={product.id}
                        className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />

                    <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
                        {product.tags.slice(0, 2).map((tag) => (
                            <TagBadge key={tag} tag={tag}/>
                        ))}
                        {soldOut && (
                            <span
                                className="rounded-full bg-ink/80 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-paper uppercase">
                {t.product.soldOut}
              </span>
                        )}
                    </div>

                    <WishButton
                        productId={product.id}
                        className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
                    />

                    {!soldOut && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                add(product.id, raw.colors[0]?.name ?? "—");
                                notify(t.product.addedToCart, product.name);
                            }}
                            className="absolute inset-x-3 bottom-3 flex h-11 translate-y-3 cursor-pointer items-center justify-center gap-2 rounded-full bg-paper/95 text-[0.82rem] font-semibold text-ink opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden"
                        >
                            <ShoppingBag className="h-3.5 w-3.5"/>
                            {t.product.addToCart}
                        </button>
                    )}
                </div>

                <div
                    className="mt-4 flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <div className="min-w-0">
                        <p
                            className="text-[0.66rem] font-semibold tracking-[0.14em] uppercase"
                            style={{color: accent}}
                        >
                            {t.categories[product.category]?.title}
                        </p>
                        <h3 className="mt-1 line-clamp-2 font-title text-[1rem] leading-snug text-ink sm:truncate sm:text-[1.05rem] sm:leading-tight">
                            {product.name}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-xs text-ink-3">
                            {product.subtitle}
                        </p>
                    </div>
                    <div className="flex shrink-0 items-baseline gap-2 sm:block sm:text-right">
                        <p className="font-display text-[1.05rem] leading-tight">
                            {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                            <p className="text-xs text-ink-3 line-through">
                                {formatPrice(product.oldPrice)}
                            </p>
                        )}
                    </div>
                </div>

                {product.colors.length > 1 && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                        {product.colors.slice(0, 5).map((c) => (
                            <span
                                key={c.name}
                                title={c.name}
                                className="h-3 w-3 rounded-full border border-ink/15"
                                style={{background: c.hex}}
                            />
                        ))}
                        {product.colors.length > 5 && (
                            <span className="text-[0.65rem] text-ink-3">
                +{product.colors.length - 5}
              </span>
                        )}
                    </div>
                )}
            </Link>
        </article>
    );
}
