"use client";

import { Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/data/categories";
import { priceBuckets, tagIds } from "@/components/catalog/filters-data";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export type FilterState = {
  category: string;
  price: string;
  tag: string;
  color: string;
  stock: boolean;
};

function Row({
  active,
  onClick,
  children,
  count,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
        active ? "bg-ink text-paper" : "text-ink-2 hover:bg-sand/70",
      )}
    >
      <span className="flex items-center gap-2.5">
        {dot && (
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: dot }}
          />
        )}
        {children}
      </span>
      {count !== undefined && (
        <span
          className={cn(
            "text-[0.72rem] tabular-nums",
            active ? "text-paper/60" : "text-ink-3",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-6 first:border-t-0 first:pt-0">
      <p className="eyebrow mb-3 px-3">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export function Filters({
  state,
  onChange,
  products,
}: {
  state: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  products: Product[];
}) {
  const t = useT();
  const countBy = (slug: string) =>
    products.filter((p) => p.category === slug).length;

  const colors = Array.from(
    products
      .flatMap((p) => p.colors)
      .reduce((map, c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
        return map;
      }, new Map<string, string>()),
  );

  return (
    <div>
      <Group title={t.common.categories}>
        <Row
          active={!state.category}
          onClick={() => onChange({ category: "" })}
          count={products.length}
        >
          {t.catalog.allProducts}
        </Row>
        {categories.map((c) => (
          <Row
            key={c.slug}
            dot={c.accent}
            active={state.category === c.slug}
            onClick={() =>
              onChange({ category: state.category === c.slug ? "" : c.slug })
            }
            count={countBy(c.slug)}
          >
            {t.categories[c.slug].title}
          </Row>
        ))}
      </Group>

      <Group title={t.catalog.price}>
        {priceBuckets.map((b) => (
          <Row
            key={b.id}
            active={state.price === b.id}
            onClick={() =>
              onChange({ price: state.price === b.id ? "" : b.id })
            }
          >
            {t.catalog.priceBuckets[b.id]}
          </Row>
        ))}
      </Group>

      <Group title={t.catalog.collections}>
        {tagIds.map((tag) => (
          <Row
            key={tag}
            active={state.tag === tag}
            onClick={() => onChange({ tag: state.tag === tag ? "" : tag })}
          >
            {t.tagFilters[tag]}
          </Row>
        ))}
      </Group>

      <Group title={t.catalog.color}>
        <div className="flex flex-wrap gap-2 px-3">
          {colors.map(([name, hex]) => (
            <button
              key={name}
              type="button"
              title={t.colors[name] ?? name}
              onClick={() =>
                onChange({ color: state.color === name ? "" : name })
              }
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all",
                state.color === name
                  ? "border-ink ring-2 ring-ink/15"
                  : "border-ink/15 hover:border-ink/40",
              )}
              style={{ background: hex }}
            >
              {state.color === name && (
                <Check className="h-3.5 w-3.5 text-ink/70" />
              )}
            </button>
          ))}
        </div>
      </Group>

      <Group title={t.catalog.availability}>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-sand/70">
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
              state.stock ? "border-ink bg-ink" : "border-ink/25",
            )}
          >
            {state.stock && <Check className="h-3 w-3 text-paper" />}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={state.stock}
            onChange={(e) => onChange({ stock: e.target.checked })}
          />
          {t.catalog.inStockOnly}
        </label>
      </Group>
    </div>
  );
}
