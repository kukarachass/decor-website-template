"use client";

import {useRef} from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import type {Product} from "@/lib/types";
import {ProductCard} from "@/components/product/ProductCard";
import {cn} from "@/lib/utils";

export function ProductRail({
                                products,
                                className,
                                itemClassName = "w-[74vw] sm:w-[44vw] lg:w-[26vw] xl:w-[21rem]",
                            }: {
    products: Product[];
    className?: string;
    itemClassName?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const scrollBy = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        el.scrollBy({left: dir * (el.clientWidth * 0.7), behavior: "smooth"});
    };

    return (
        <div className={cn("relative px-5 md:px-8", className)}>
            <div
                ref={ref}
                className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8"
            >
                {products.map((p) => (
                    <div key={p.id} className={cn("shrink-0 snap-start", itemClassName)}>
                        <ProductCard product={p}/>
                    </div>
                ))}
            </div>

            <div className="flex flex-row gap-2 justify-center">
                <button
                    type="button"
                    aria-label="←"
                    onClick={() => scrollBy(-1)}
                    className=" flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/12 transition-all hover:border-ink/40 hover:bg-white/60 active:scale-95"
                >
                    <ArrowLeft className="h-4 w-4"/>
                </button>
                <button
                    type="button"
                    aria-label="→"
                    onClick={() => scrollBy(1)}
                    className=" right-[-50px] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/12 transition-all hover:border-ink/40 hover:bg-white/60 active:scale-95"
                >
                    <ArrowRight className="h-4 w-4"/>
                </button>
            </div>
        </div>
    );
}