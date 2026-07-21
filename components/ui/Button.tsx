import {cn} from "@/lib/utils";

type Variant = "primary" | "outline" | "soft" | "ghost" | "clay";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
    primary:
        "bg-ink text-paper hover:bg-ink-2 shadow-[0_10px_30px_-14px_rgba(43,37,33,0.7)]",
    clay: "bg-clay-2 text-paper hover:bg-clay shadow-[0_10px_30px_-14px_rgba(171,135,104,0.9)]",
    outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-sand/50",
    soft: "bg-sand text-ink hover:bg-sand-2",
    ghost: "text-ink hover:bg-sand/70",
};

const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-[0.82rem]",
    md: "h-11 px-6 text-[0.88rem]",
    lg: "h-13 px-8 text-[0.94rem]",
};

export function buttonStyles({
                                 variant = "primary",
                                 size = "md",
                                 full = false,
                                 className,
                             }: {
    variant?: Variant;
    size?: Size;
    full?: boolean;
    className?: string;
} = {}) {
    return cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
        variants[variant],
        sizes[size],
        full && "w-full",
        className,
    );
}

export function Button({
                           variant,
                           size,
                           full,
                           className,
                           ...props
                       }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    full?: boolean;
}) {
    return (
        <button
            {...props}
            className={buttonStyles({variant, size, full, className})}
        />
    );
}
