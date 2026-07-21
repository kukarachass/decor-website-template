"use client";

import { useEffect } from "react";

/**
 * Клієнтські сторінки не можуть експортувати metadata,
 * тому заголовок вкладки виставляємо вручну.
 */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} · Žoria Decor`;
  }, [title]);
  return null;
}
