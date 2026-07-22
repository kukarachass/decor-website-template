import type {CategorySlug} from "@/lib/types";
import {cn, hashCode} from "@/lib/utils";
import {categoryMap} from "@/lib/data/categories";

/**
 * Заглушка замість фото товару: мʼякий градієнт + лінійна ілюстрація категорії.
 * Композиція детермінована (залежить від seed), тому не «стрибає» між рендерами,
 * але сусідні товари однієї категорії виглядають по-різному.
 */

/** Кожна категорія має свій акцент — фон ілюстрації тонується ним. */
const mixes: [number, number][] = [
    [10, 26],
    [14, 32],
    [8, 22],
    [16, 36],
    [12, 28],
];

const glyphs: Record<CategorySlug, React.ReactNode[]> = {
    polytsi: [
        <>
            <path d="M20 58h60M28 58v7M72 58v7"/>
            <path d="M30 38h40M38 38v5M62 38v5"/>
            <path d="M46 38c0-4-3-5-3-8s2-4 4-4 4 1 4 4-3 4-3 8"/>
            <path d="M56 58V47h4v11M63 58V44h4v14"/>
        </>,
        <>
            <path d="M22 60h56M30 60l-4 9M70 60l4 9"/>
            <path d="M38 60V47h7v13M49 60V41h5v19M58 60v-8c0-3 5-3 5 0v8"/>
        </>,
        <>
            <path d="M28 32h44v12H28zM28 56h44v12H28z"/>
            <path d="M34 32V26M66 32v-6M34 56v-6M66 56v-6"/>
            <path d="M44 56v-6c0-3 2-4 4-4s4 1 4 4v6"/>
        </>,
    ],
    kastruli: [
        <>
            <path d="M30 46v22a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V46"/>
            <path d="M24 46h52"/>
            <path d="M46 46v-3a4 4 0 0 1 8 0v3"/>
            <path d="M30 54h-6a3 3 0 0 1 0-6h6M70 54h6a3 3 0 0 0 0-6h-6"/>
            <path d="M42 36c2-3-2-5 0-8M58 36c2-3-2-5 0-8" opacity="0.45"/>
        </>,
        <>
            <path d="M28 48h34v16a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8z"/>
            <path d="M24 48h42"/>
            <path d="M62 52h12a3 3 0 0 1 0 6H62"/>
            <path d="M40 38c2-3-2-5 0-8" opacity="0.45"/>
        </>,
    ],
    chashky: [
        <>
            <path d="M34 40h30l-3 26a7 7 0 0 1-7 6H44a7 7 0 0 1-7-6z"/>
            <path d="M64 46h4a8 8 0 0 1 0 16h-5"/>
            <path d="M26 78h48"/>
            <path d="M44 32c2-3-2-5 0-8M54 32c2-3-2-5 0-8" opacity="0.45"/>
        </>,
        <>
            <path d="M38 34h24l-3 34a5 5 0 0 1-5 4h-8a5 5 0 0 1-5-4z"/>
            <path d="M39 48h22" opacity="0.55"/>
            <path d="M44 26c2-3-2-5 0-8" opacity="0.45"/>
        </>,
        <>
            <path d="M34 42h30v20a10 10 0 0 1-10 10h-10a10 10 0 0 1-10-10z"/>
            <path d="M30 42h38"/>
            <path d="M64 48h4a7 7 0 0 1 0 14h-4"/>
        </>,
    ],
    tyulpany: [
        <>
            <path d="M40 60l-2 14a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4l-2-14z"/>
            <path d="M38 60h24"/>
            <path d="M50 60V36M47 60c-1-7-4-10-8-14M53 60c1-7 4-9 8-13"/>
            <path d="M46 36c0-5 2-8 4-8s4 3 4 8c0 3-2 4-4 4s-4-1-4-4z"/>
            <path d="M35 46c-1-4 0-7 2-8s4 1 5 5c1 3-1 5-3 5s-3-1-4-2z"/>
            <path d="M65 47c1-4 0-7-2-8s-4 1-5 5c-1 3 1 5 3 5s3-1 4-2z"/>
        </>,
        <>
            <path d="M50 74V38M43 74c-1-12-3-18-7-24M57 74c1-12 3-17 7-23"/>
            <path d="M46 38c0-6 2-9 4-9s4 3 4 9c0 3-2 5-4 5s-4-2-4-5z"/>
            <path d="M32 48c-1-5 0-8 2-9s5 2 6 6-1 6-3 6-4-1-5-3z"/>
            <path d="M68 49c1-5 0-8-2-9s-5 2-6 6 1 6 3 6 4-1 5-3z"/>
            <path d="M40 64c6 3 14 3 20 0"/>
        </>,
        <>
            <path d="M42 62h16l-2 16H44z"/>
            <path d="M40 62h20"/>
            <path d="M50 62V40"/>
            <path d="M45 40c0-6 2-9 5-9s5 3 5 9c0 4-2 6-5 6s-5-2-5-6z"/>
            <path d="M44 70h12" opacity="0.5"/>
        </>,
    ],
    organaizery: [
        <>
            <rect x="28" y="30" width="44" height="16" rx="3"/>
            <rect x="28" y="48" width="44" height="16" rx="3"/>
            <rect x="28" y="66" width="44" height="14" rx="3"/>
            <path d="M44 38h12M44 56h12M44 73h12"/>
        </>,
        <>
            <rect x="32" y="44" width="36" height="30" rx="4"/>
            <path d="M50 44v30"/>
            <path d="M38 44V32M44 44v-8M58 44V30M63 44v-7"/>
        </>,
        <>
            <rect x="26" y="40" width="48" height="28" rx="4"/>
            <path d="M42 40v28M58 40v28M26 54h16"/>
        </>,
    ],
    kosmetychky: [
        <>
            <path d="M29 46h42l-4 26a4 4 0 0 1-4 3H37a4 4 0 0 1-4-3z"/>
            <path d="M29 46c6-10 36-10 42 0"/>
            <path d="M50 46v7"/>
            <circle cx="50" cy="56" r="2.6"/>
        </>,
        <>
            <path d="M30 48h40v22a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4z"/>
            <path d="M28 48h44"/>
            <path d="M42 48v-4a8 8 0 0 1 16 0v4"/>
            <path d="M36 60h9" opacity="0.6"/>
        </>,
        <>
            <path d="M32 40h36v34H32z"/>
            <path d="M32 52h36"/>
            <path d="M46 40v-5h8v5"/>
            <circle cx="50" cy="63" r="2.4"/>
        </>,
    ],
    vazy: [
        <>
            <path d="M42 28c0 7-11 12-11 24 0 13 8 22 19 22s19-9 19-22c0-12-11-17-11-24"/>
            <path d="M40 28h20"/>
            <path d="M36 48c8 4 20 4 28 0" opacity="0.45"/>
        </>,
        <>
            <path d="M42 30h16"/>
            <path d="M44 30c0 6-10 10-10 22s7 22 16 22 16-10 16-22-10-16-10-22"/>
            <path d="M34 42c-5 2-7 8-4 12M66 42c5 2 7 8 4 12"/>
        </>,
        <>
            <path d="M36 44h28"/>
            <path d="M38 44c-2 10 2 26 12 26s14-16 12-26"/>
            <path d="M44 44v-7M50 44V32M56 44v-9" opacity="0.6"/>
        </>,
        <>
            <path d="M44 24h12v14c6 4 9 11 9 19 0 12-7 19-15 19s-15-7-15-19c0-8 3-15 9-19z"/>
            <path d="M42 38h16" opacity="0.5"/>
        </>,
    ],
    svitylnyky: [
        <>
            <path d="M36 46l7-16h14l7 16z"/>
            <path d="M50 46v22M39 68h22"/>
            <path d="M30 52l-5 4M70 52l5 4M50 24v-5" opacity="0.45"/>
        </>,
        <>
            <path d="M50 20v12"/>
            <path d="M32 52a18 18 0 0 1 36 0z"/>
            <path d="M30 52h40"/>
            <path d="M42 62c2 4 6 6 8 6s6-2 8-6" opacity="0.4"/>
        </>,
        <>
            <path d="M34 42a16 16 0 0 1 32 0v2H34z"/>
            <path d="M50 44v20M40 66h20"/>
            <path d="M26 40l-5-3M74 40l5-3" opacity="0.45"/>
        </>,
    ],
    pidsvichnyky: [
        <>
            <path d="M44 44V30h12v14"/>
            <path d="M50 30c-3-3-1-7 2-9-1 4 3 4 3 8 0 2-2 3-5 1z"/>
            <path d="M40 44h20l-3 8H43z"/>
            <path d="M50 52v14M38 70h24"/>
        </>,
        <>
            <path d="M32 58h14v18H32zM54 50h14v26H54z"/>
            <path d="M39 58c-3-3-1-6 1-8-1 3 2 3 2 6M61 50c-3-3-1-6 1-8-1 3 2 3 2 6"/>
        </>,
        <>
            <path d="M46 34h8v20h-8z"/>
            <path d="M50 34c-3-3-1-7 2-9-1 4 3 4 3 8 0 2-2 3-5 1z"/>
            <path d="M36 54h28a14 14 0 0 1-28 0z"/>
            <path d="M50 68v6M42 74h16"/>
        </>,
    ],
    tapochky: [
        <>
            <path d="M34 42c-7 0-10 6-10 14s3 16 10 16 9-7 9-15-2-15-9-15z"/>
            <path d="M25 52c4 3 13 3 17 0"/>
            <path d="M66 42c-7 0-10 6-10 14s3 16 10 16 9-7 9-15-2-15-9-15z"/>
            <path d="M57 52c4 3 13 3 17 0"/>
        </>,
        <>
            <path d="M24 64c0-6 6-8 13-8 8 0 12-9 21-9s14 5 14 11-6 10-15 10H32c-5 0-8-2-8-4z"/>
            <path d="M53 49c5 2 8 6 9 11"/>
            <path d="M24 66h48" opacity="0.4"/>
        </>,
    ],
};

export function ProductArt({
    category,
    seed,
    variant = 0,
    className,
    glyphClassName,
    strokeWidth = 1.15,
    plain = false,
}: {
    category: CategorySlug;
    seed: string;
    variant?: number;
    className?: string;
    glyphClassName?: string;
    strokeWidth?: number;
    /** Без градієнта й підкладки — лише лінійний малюнок на світлій поверхні */
    plain?: boolean;
}) {
    const base = hashCode(seed);
    const h = hashCode(seed + variant);
    const accent = categoryMap[category]?.accent ?? "#C2A288";
    const [from, to] = mixes[h % mixes.length];
    const set = glyphs[category] ?? glyphs.vazy;
    const glyph = set[base % set.length];
    const blobX = 18 + (h % 5) * 12;
    const blobY = 14 + ((h >> 3) % 5) * 10;
    const rotate = ((h >> 5) % 7) - 3;
    const scale = 1 + (((h >> 7) % 5) - 2) * 0.03;
    const arch = base % 3 === 1;

    return (
        <div
            className={cn(
                // `relative` потрібен лише тоді, коли ззовні не задано інше позиціонування
                !className?.includes("absolute") && "relative",
                "isolate overflow-hidden",
                className,
            )}
            style={{
                background: plain
                    ? "rgba(255,255,255,0.55)"
                    : `linear-gradient(155deg, color-mix(in srgb, ${accent} ${from}%, #FDFBF8), color-mix(in srgb, ${accent} ${to}%, #F4EEE6))`,
            }}
        >
            {/* мʼяка світлова пляма */}
            {!plain && <div
                aria-hidden
                className="absolute h-[70%] w-[70%] rounded-full opacity-70 blur-2xl"
                style={{
                    left: `${blobX}%`,
                    top: `${blobY}%`,
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), transparent 70%)",
                }}
            />}
            {/* підкладка: коло або арка */}
            {!plain && <div
                aria-hidden
                className={cn(
                    "absolute left-1/2 top-1/2 h-[62%] w-[58%] -translate-x-1/2 -translate-y-1/2 border border-white/50 bg-white/30",
                    arch ? "rounded-t-full rounded-b-2xl" : "rounded-full",
                )}
            />}
            <svg
                viewBox="0 0 100 100"
                aria-hidden
                className={cn("absolute inset-0 h-full w-full", glyphClassName)}
                fill="none"
                stroke={glyphClassName ? "currentColor" : `color-mix(in srgb, ${accent} 78%, #2B2521)`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.75 }}
            >
                <g
                    transform={`rotate(${rotate} 50 50) translate(${
                        (1 - scale) * 50
                    } ${(1 - scale) * 50}) scale(${scale})`}
                >
                    {glyph}
                </g>
            </svg>
            {!plain && <div className="grain absolute inset-0" aria-hidden/>}
        </div>
    );
}
