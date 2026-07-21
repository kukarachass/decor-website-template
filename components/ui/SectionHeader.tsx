"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  align = "between",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "between" | "center";
  className?: string;
}) {
  const t = useT();
  const label = linkLabel ?? t.common.viewAll;
  return (
    <Reveal
      className={cn(
        "flex gap-6",
        align === "center"
          ? "flex-col items-center text-center"
          : "flex-col items-start justify-between md:flex-row md:items-end",
        className,
      )}
    >
      <div className={cn(align === "center" ? "max-w-2xl" : "max-w-2xl")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-[1.9rem] leading-[1.1] text-ink sm:text-[2.25rem] lg:text-[2.6rem]">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "lead mt-4 text-sm leading-relaxed",
              align === "center" ? "mx-auto max-w-xl" : "max-w-md",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 text-[0.86rem] font-semibold text-ink"
        >
          <span className="link-underline">{label}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
