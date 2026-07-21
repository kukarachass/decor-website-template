import type { Metadata } from "next";
import { productBySlug, products } from "@/lib/data/products";
import { ProductView } from "@/components/product/ProductView";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Товар" };
  return {
    title: product.name,
    description: product.subtitle,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductView slug={slug} />;
}
