import type { CategorySlug } from "@/lib/types";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** 1290 → «1 290 ₴» (нерозривний пробіл, однаково на сервері та клієнті) */
export function formatPrice(value: number) {
  return `${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₴`;
}

export function formatNumber(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const MONTHS = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

export function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateShort(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** Українське відмінювання: plural(3, ['товар','товари','товарів']) */
export function plural(n: number, forms: [string, string, string]) {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

/** Детермінований хеш рядка — для стабільних «випадкових» варіацій */
export function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const translit: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh",
  з: "z", и: "y", і: "i", ї: "i", й: "i", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ь: "", ю: "iu", я: "ia", ы: "y", э: "e",
  ъ: "", ё: "e",
};

/** «Ваза «Рельєф»» → «vaza-relief» */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .split("")
    .map((ch) => translit[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function orderNumber(id: string) {
  return `№ ${id.replace(/[^0-9]/g, "").slice(-6) || "000000"}`;
}

export const categoryOrderHint: Record<CategorySlug, string> = {
  polytsi: "Легко монтується",
  vazy: "Кераміка ручної роботи",
  tyulpany: "Не в'януть",
  chashky: "Можна в посудомийку",
  organaizery: "Порядок за 5 хвилин",
  kosmetychky: "Тримає форму",
  kastruli: "Для індукції",
  svitylnyky: "Тепле світло",
  pidsvichnyky: "Для довгих свічок",
  tapochky: "Memory foam",
};
