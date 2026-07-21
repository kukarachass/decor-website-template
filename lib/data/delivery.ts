import type { DeliveryMethod, PaymentMethod } from "@/lib/types";

export const FREE_SHIPPING_FROM = 1500;

export const deliveryOptions: {
  id: DeliveryMethod;
  title: string;
  caption: string;
  price: number;
  eta: string;
}[] = [
  {
    id: "np-branch",
    title: "Нова пошта — відділення",
    caption: "Понад 12 000 відділень по Україні",
    price: 80,
    eta: "1–3 дні",
  },
  {
    id: "np-locker",
    title: "Нова пошта — поштомат",
    caption: "Забрати без черги, 24/7",
    price: 70,
    eta: "1–3 дні",
  },
  {
    id: "ukrposhta",
    title: "Укрпошта",
    caption: "Найвигідніша доставка у будь-яке село",
    price: 55,
    eta: "3–5 днів",
  },
];

export const paymentOptions: {
  id: PaymentMethod;
  title: string;
  caption: string;
}[] = [
  {
    id: "online",
    title: "Оплата карткою онлайн",
    caption: "Visa / Mastercard, Apple Pay, Google Pay",
  },
  {
    id: "cod",
    title: "Накладений платіж",
    caption: "Оплата під час отримання на пошті",
  },
];

export const deliveryTitle = (id: DeliveryMethod) =>
  deliveryOptions.find((d) => d.id === id)?.title ?? id;

export const paymentTitle = (id: PaymentMethod) =>
  paymentOptions.find((p) => p.id === id)?.title ?? id;

export const cities = [
  "Київ",
  "Львів",
  "Одеса",
  "Харків",
  "Дніпро",
  "Вінниця",
  "Полтава",
  "Івано-Франківськ",
  "Тернопіль",
  "Чернівці",
  "Ужгород",
  "Житомир",
  "Луцьк",
  "Рівне",
  "Черкаси",
];

export const branches: Record<string, string[]> = {
  default: [
    "Відділення №1: вул. Центральна, 12",
    "Відділення №4: вул. Соборна, 47",
    "Відділення №9: просп. Миру, 3",
    "Відділення №15: вул. Шевченка, 108",
    "Відділення №23: вул. Лесі Українки, 22",
  ],
  Київ: [
    "Відділення №1: вул. Пирогівський шлях, 135",
    "Відділення №27: вул. Хрещатик, 44",
    "Відділення №53: просп. Берестейський, 67",
    "Відділення №148: вул. Ак. Заболотного, 20",
    "Відділення №204: вул. Володимирська, 91",
  ],
  Львів: [
    "Відділення №2: вул. Городоцька, 359",
    "Відділення №11: просп. Чорновола, 16",
    "Відділення №34: вул. Стрийська, 45",
    "Відділення №77: вул. Наукова, 7",
  ],
  Одеса: [
    "Відділення №3: вул. Дерибасівська, 14",
    "Відділення №18: просп. Небесної Сотні, 2",
    "Відділення №46: вул. Академіка Корольова, 33",
  ],
};

export const lockers: Record<string, string[]> = {
  default: [
    "Поштомат №5201: біля АТБ, вул. Центральна, 8",
    "Поштомат №5310: ТЦ «Порт Сіті», 1 поверх",
    "Поштомат №5417: вул. Гагаріна, 21",
  ],
  Київ: [
    "Поштомат №32001: ТРЦ Lavina Mall",
    "Поштомат №32115: вул. Драгоманова, 1",
    "Поштомат №32460: просп. Оболонський, 26",
  ],
  Львів: [
    "Поштомат №41002: ТРЦ «Форум Львів»",
    "Поштомат №41180: вул. Личаківська, 92",
  ],
};

export function branchesFor(city: string, method: DeliveryMethod) {
  if (method === "np-locker") return lockers[city] ?? lockers.default;
  if (method === "ukrposhta")
    return (branches[city] ?? branches.default).map((b) =>
      b.replace("Відділення", "Поштове відділення"),
    );
  return branches[city] ?? branches.default;
}

export function shippingCost(method: DeliveryMethod, subtotal: number) {
  if (subtotal >= FREE_SHIPPING_FROM) return 0;
  return deliveryOptions.find((d) => d.id === method)?.price ?? 0;
}

export const promoCodes: Record<string, { discount: number; label: string }> = {
  ZORIA10: { discount: 0.1, label: "−10% на замовлення" },
  ВЕСНА15: { discount: 0.15, label: "−15% весняна знижка" },
  FIRST: { discount: 0.05, label: "−5% на перше замовлення" },
};
