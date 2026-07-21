import type { ProductTag } from "@/lib/types";

export type PriceBucketId = "0-500" | "500-1000" | "1000-1500" | "1500";
export type SortId = "popular" | "new" | "price-asc" | "price-desc" | "rating";

export const priceBuckets: { id: PriceBucketId; min: number; max: number }[] = [
  { id: "0-500", min: 0, max: 500 },
  { id: "500-1000", min: 500, max: 1000 },
  { id: "1000-1500", min: 1000, max: 1500 },
  { id: "1500", min: 1500, max: Infinity },
];

export const sortIds: SortId[] = [
  "popular",
  "new",
  "price-asc",
  "price-desc",
  "rating",
];

export const tagIds: ProductTag[] = ["new", "bestseller", "sale", "limited"];
