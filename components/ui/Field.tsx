import { cn } from "@/lib/utils";

const base =
  "w-full rounded-2xl border border-ink/12 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-ink-3/70 outline-none transition-colors focus:border-clay focus:bg-white";

export function Label({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-2 block text-[0.72rem] tracking-[0.16em] uppercase text-ink-3", className)}
    >
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, className)} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, "min-h-28 resize-y", className)} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(base, "cursor-pointer appearance-none pr-10", className)}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-2 text-xs text-[#b06a6a]">{children}</p>;
}
