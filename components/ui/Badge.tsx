"use client";

import type { ProductTag } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const tagClass: Record<ProductTag, string> = {
  new: "bg-ink text-paper",
  bestseller: "bg-clay-2 text-paper",
  sale: "bg-rose text-paper",
  limited: "bg-sage text-paper",
};

export function TagBadge({
  tag,
  className,
}: {
  tag: ProductTag;
  className?: string;
}) {
  const t = useT();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.1em] uppercase",
        tagClass[tag],
        className,
      )}
    >
      {t.tags[tag]}
    </span>
  );
}

export function Chip({
  children,
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer rounded-full border px-4 py-2 text-[0.82rem] font-medium whitespace-nowrap transition-all duration-300",
        active
          ? "border-ink bg-ink text-paper"
          : "border-ink/12 bg-white/50 text-ink-2 hover:border-ink/30",
        className,
      )}
    >
      {children}
    </button>
  );
}
