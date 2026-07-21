import { cn } from "@/lib/utils";

export function Stars({
  rating,
  className,
  size = 12,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[3px]", className)} aria-label={`Оцінка ${rating} з 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            aria-hidden
            className="shrink-0"
          >
            <defs>
              <linearGradient id={`st-${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                <stop offset={`${fill * 100}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"
              fill={`url(#st-${i}-${Math.round(fill * 100)})`}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              opacity={fill > 0 ? 1 : 0.35}
            />
          </svg>
        );
      })}
    </span>
  );
}
