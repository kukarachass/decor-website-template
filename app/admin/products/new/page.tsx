"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { useUI } from "@/lib/store/ui";
import { categories } from "@/lib/data/categories";
import { useT } from "@/lib/i18n";
import type { CategorySlug, Product, ProductTag } from "@/lib/types";
import { cn, formatPrice, slugify } from "@/lib/utils";
import { Input, Label, Select, Textarea, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { TagBadge } from "@/components/ui/Badge";

const palette = [
  { name: "Молочний", hex: "#F2E9DD" },
  { name: "Бежевий", hex: "#DCC7AE" },
  { name: "Латте", hex: "#C6A98D" },
  { name: "Шоколад", hex: "#6B4F3A" },
  { name: "Графіт", hex: "#2A2724" },
  { name: "Білий", hex: "#F7F5F2" },
  { name: "Шавлія", hex: "#9BA791" },
  { name: "Пудровий", hex: "#E4C9C0" },
  { name: "Теракота", hex: "#B87B62" },
  { name: "Золото", hex: "#C9A85C" },
  { name: "Прозорий", hex: "#E4EBEC" },
  { name: "Сірий", hex: "#B7B2AC" },
];

const allTags: ProductTag[] = ["new", "bestseller", "sale", "limited"];

function ProductForm() {
  const t = useT();
  const router = useRouter();
  const params = useSearchParams();
  const editId = params.get("id");
  const products = useShop((s) => s.products);
  const addProduct = useShop((s) => s.addProduct);
  const updateProduct = useShop((s) => s.updateProduct);
  const notify = useUI((s) => s.notify);

  const existing = editId ? products.find((p) => p.id === editId) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    subtitle: existing?.subtitle ?? "",
    category: (existing?.category ?? "vazy") as CategorySlug,
    price: existing ? String(existing.price) : "",
    oldPrice: existing?.oldPrice ? String(existing.oldPrice) : "",
    stock: existing ? String(existing.stock) : "10",
    description: existing?.description ?? "",
    features: existing?.features.join("\n") ?? "",
    sizes: existing?.sizes?.join(", ") ?? "",
    material:
      existing?.specs.find((s) => s.label === "Матеріал")?.value ?? "Кераміка",
    dimensions:
      existing?.specs.find((s) => s.label === "Розміри")?.value ?? "",
    colors: existing?.colors.map((c) => c.name) ?? ["Молочний"],
    tags: existing?.tags ?? ([] as ProductTag[]),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors({});
  };

  const toggleColor = (name: string) =>
    set({
      colors: form.colors.includes(name)
        ? form.colors.filter((c) => c !== name)
        : [...form.colors, name],
    });

  const toggleTag = (tag: ProductTag) =>
    set({
      tags: form.tags.includes(tag)
        ? form.tags.filter((t) => t !== tag)
        : [...form.tags, tag],
    });

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.admin.errName;
    if (!form.price || Number(form.price) <= 0) e.price = t.admin.errPrice;
    if (form.colors.length === 0) e.colors = t.admin.errColors;
    setErrors(e);
    if (Object.keys(e).length) return;

    const payload: Product = {
      id: existing?.id ?? "p-" + Date.now(),
      slug: existing?.slug ?? (slugify(form.name) || "tovar-" + Date.now()),
      name: form.name.trim(),
      subtitle: form.subtitle.trim() || "Декор для дому",
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      colors: palette.filter((c) => form.colors.includes(c.name)),
      sizes: form.sizes
        ? form.sizes
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
      description:
        form.description.trim() ||
        "Спокійна форма й приємні матеріали — річ, яка легко вписується в інтерʼєр.",
      features: form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      specs: [
        { label: "Матеріал", value: form.material || "—" },
        { label: "Розміри", value: form.dimensions || "—" },
        { label: "Догляд", value: "Протирати мʼякою вологою серветкою" },
      ],
      rating: existing?.rating ?? 5,
      reviews: existing?.reviews ?? 0,
      stock: Number(form.stock) || 0,
      tags: form.tags,
      createdAt: existing?.createdAt ?? new Date().toISOString().slice(0, 10),
    };

    if (existing) {
      updateProduct(existing.id, payload);
      notify(t.admin.updated, payload.name);
    } else {
      addProduct(payload);
      notify(t.admin.added, payload.name);
    }
    router.push("/admin/products");
  };

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.admin.backToList}
      </Link>

      <h1 className="mt-6 font-display text-[2.2rem] leading-none sm:text-[2.8rem]">
        {existing ? t.admin.editProduct : t.admin.newProduct}
      </h1>
      <p className="mt-3 text-sm text-ink-2">
        {t.admin.formText}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] xl:gap-12">
        <div className="space-y-8">
          <section className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
            <p className="font-display text-xl">{t.admin.basics}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">{t.admin.name}</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => set({ name: e.target.value })}
                  placeholder="Ваза «Рельєф»"
                />
                <FieldError>{errors.name}</FieldError>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="subtitle">{t.admin.subtitle}</Label>
                <Input
                  id="subtitle"
                  value={form.subtitle}
                  onChange={(e) => set({ subtitle: e.target.value })}
                  placeholder="Керамічна ваза з вертикальним рифленням"
                />
              </div>
              <div>
                <Label htmlFor="category">{t.admin.category}</Label>
                <Select
                  id="category"
                  value={form.category}
                  onChange={(e) =>
                    set({ category: e.target.value as CategorySlug })
                  }
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {t.categories[c.slug].title}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="stock">{t.admin.stockPcs}</Label>
                <Input
                  id="stock"
                  type="number"
                  value={form.stock}
                  onChange={(e) => set({ stock: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="price">{t.admin.price}</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => set({ price: e.target.value })}
                  placeholder="890"
                />
                <FieldError>{errors.price}</FieldError>
              </div>
              <div>
                <Label htmlFor="oldPrice">{t.admin.oldPrice}</Label>
                <Input
                  id="oldPrice"
                  type="number"
                  value={form.oldPrice}
                  onChange={(e) => set({ oldPrice: e.target.value })}
                  placeholder="—"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
            <p className="font-display text-xl">{t.admin.descSection}</p>
            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="description">{t.admin.description}</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => set({ description: e.target.value })}
                  placeholder="Розкажіть, чим ця річ особлива…"
                />
              </div>
              <div>
                <Label htmlFor="features">{t.admin.features}</Label>
                <Textarea
                  id="features"
                  value={form.features}
                  onChange={(e) => set({ features: e.target.value })}
                  placeholder={"Ручне формування\nМатова глазур\nГерметичне дно"}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="material">{t.admin.material}</Label>
                  <Input
                    id="material"
                    value={form.material}
                    onChange={(e) => set({ material: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">{t.admin.dimensions}</Label>
                  <Input
                    id="dimensions"
                    value={form.dimensions}
                    onChange={(e) => set({ dimensions: e.target.value })}
                    placeholder="24 × 12 × 10 см"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sizes">
                  {t.admin.sizes}
                </Label>
                <Input
                  id="sizes"
                  value={form.sizes}
                  onChange={(e) => set({ sizes: e.target.value })}
                  placeholder="S · 18 см, M · 24 см"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-line bg-paper p-6 sm:p-7">
            <p className="font-display text-xl">{t.admin.colorsSection}</p>
            <div className="mt-6">
              <Label>{t.admin.colorsAvailable}</Label>
              <div className="flex flex-wrap gap-2">
                {palette.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => toggleColor(c.name)}
                    title={t.colors[c.name] ?? c.name}
                    className={cn(
                      "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all",
                      form.colors.includes(c.name)
                        ? "border-ink ring-2 ring-ink/15"
                        : "border-ink/15 hover:border-ink/40",
                    )}
                    style={{ background: c.hex }}
                  >
                    {form.colors.includes(c.name) && (
                      <Check className="h-4 w-4 text-ink/70" />
                    )}
                  </button>
                ))}
              </div>
              <FieldError>{errors.colors}</FieldError>
            </div>

            <div className="mt-7">
              <Label>{t.admin.tagsLabel}</Label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-[0.78rem] transition-colors",
                      form.tags.includes(tag)
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/12 text-ink-2 hover:border-ink/35",
                    )}
                  >
                    {t.tags[tag]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={submit}>
              {existing ? t.admin.saveChanges : t.admin.publish}
            </Button>
            <Link
              href="/admin/products"
              className="inline-flex h-13 items-center rounded-full border border-ink/15 px-8 text-[0.86rem] transition-colors hover:border-ink/40"
            >
              {t.common.cancel}
            </Link>
          </div>
        </div>

        {/* прев'ю */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="eyebrow mb-4">{t.admin.preview}</p>
          <div className="rounded-[24px] border border-line bg-paper p-5">
            <div className="relative overflow-hidden rounded-[20px]">
              <ProductArt
                category={form.category}
                seed={form.name || "preview"}
                className="aspect-[4/5] w-full"
              />
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {form.tags.map((t) => (
                  <TagBadge key={t} tag={t} />
                ))}
              </div>
            </div>
            <p className="mt-4 text-[0.66rem] tracking-[0.18em] text-ink-3 uppercase">
              {t.categories[form.category].title}
            </p>
            <p className="mt-1 font-display text-xl leading-tight">
              {form.name || t.admin.productName}
            </p>
            <p className="mt-1 text-xs text-ink-3">
              {form.subtitle || t.admin.subtitle}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-xl">
                {formatPrice(Number(form.price) || 0)}
              </span>
              {form.oldPrice && (
                <span className="text-xs text-ink-3 line-through">
                  {formatPrice(Number(form.oldPrice))}
                </span>
              )}
            </div>
            <div className="mt-3 flex gap-1.5">
              {palette
                .filter((c) => form.colors.includes(c.name))
                .map((c) => (
                  <span
                    key={c.name}
                    className="h-3 w-3 rounded-full border border-ink/15"
                    style={{ background: c.hex }}
                  />
                ))}
            </div>
          </div>
          <p className="mt-4 text-[0.7rem] leading-relaxed text-ink-3">
            {t.admin.previewNote}
          </p>
        </aside>
      </div>
    </div>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="py-20" />}>
      <ProductForm />
    </Suspense>
  );
}
