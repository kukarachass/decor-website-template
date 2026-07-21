import type { Order, OrderStatus, DeliveryMethod, PaymentMethod } from "@/lib/types";
import { products } from "@/lib/data/products";
import { shippingCost } from "@/lib/data/delivery";

type Seed = {
  id: string;
  date: string;
  status: OrderStatus;
  name: [string, string];
  phone: string;
  email: string;
  method: DeliveryMethod;
  city: string;
  branch: string;
  payment: PaymentMethod;
  lines: [string, number, number][]; // [productId, qty, colorIndex]
  comment?: string;
  discount?: number;
};

const seeds: Seed[] = [
  {
    id: "ZD-240712",
    date: "2026-07-20T09:14:00",
    status: "new",
    name: ["Олена", "Ковальчук"],
    phone: "+380 (67) 412-88-01",
    email: "olena.kovalchuk@gmail.com",
    method: "np-branch",
    city: "Київ",
    branch: "Відділення №27: вул. Хрещатик, 44",
    payment: "online",
    lines: [
      ["p-010", 1, 0],
      ["p-020", 2, 0],
    ],
    comment: "Будь ласка, додайте листівку — це подарунок",
  },
  {
    id: "ZD-240711",
    date: "2026-07-19T18:02:00",
    status: "new",
    name: ["Марія", "Гнатюк"],
    phone: "+380 (95) 220-14-77",
    email: "m.hnatiuk@ukr.net",
    method: "np-locker",
    city: "Львів",
    branch: "Поштомат №41002: ТРЦ «Форум Львів»",
    payment: "cod",
    lines: [["p-070", 1, 1]],
  },
  {
    id: "ZD-240710",
    date: "2026-07-19T11:40:00",
    status: "processing",
    name: ["Ірина", "Демченко"],
    phone: "+380 (63) 887-30-25",
    email: "iryna.dem@gmail.com",
    method: "np-branch",
    city: "Одеса",
    branch: "Відділення №18: просп. Небесної Сотні, 2",
    payment: "online",
    lines: [
      ["p-050", 1, 2],
      ["p-040", 1, 0],
      ["p-030", 2, 1],
    ],
    discount: 0.1,
  },
  {
    id: "ZD-240709",
    date: "2026-07-18T15:27:00",
    status: "processing",
    name: ["Софія", "Мельник"],
    phone: "+380 (98) 145-62-09",
    email: "sofia.melnyk@gmail.com",
    method: "ukrposhta",
    city: "Полтава",
    branch: "Поштове відділення №9: просп. Миру, 3",
    payment: "cod",
    lines: [
      ["p-090", 1, 0],
      ["p-023", 2, 1],
    ],
  },
  {
    id: "ZD-240708",
    date: "2026-07-17T20:11:00",
    status: "shipped",
    name: ["Анастасія", "Бондар"],
    phone: "+380 (50) 333-77-12",
    email: "nastia.bondar@icloud.com",
    method: "np-branch",
    city: "Харків",
    branch: "Відділення №15: вул. Шевченка, 108",
    payment: "online",
    lines: [
      ["p-061", 1, 0],
      ["p-062", 1, 1],
    ],
  },
  {
    id: "ZD-240707",
    date: "2026-07-16T10:05:00",
    status: "shipped",
    name: ["Вікторія", "Романюк"],
    phone: "+380 (73) 909-41-38",
    email: "vika.romaniuk@gmail.com",
    method: "np-locker",
    city: "Київ",
    branch: "Поштомат №32115: вул. Драгоманова, 1",
    payment: "online",
    lines: [
      ["p-001", 1, 0],
      ["p-081", 2, 0],
    ],
  },
  {
    id: "ZD-240706",
    date: "2026-07-15T13:49:00",
    status: "delivered",
    name: ["Тетяна", "Кравець"],
    phone: "+380 (66) 512-08-44",
    email: "t.kravets@ukr.net",
    method: "np-branch",
    city: "Дніпро",
    branch: "Відділення №4: вул. Соборна, 47",
    payment: "cod",
    lines: [
      ["p-013", 1, 0],
      ["p-021", 1, 0],
    ],
  },
  {
    id: "ZD-240705",
    date: "2026-07-14T08:22:00",
    status: "delivered",
    name: ["Юлія", "Савченко"],
    phone: "+380 (97) 774-19-56",
    email: "yulia.savchenko@gmail.com",
    method: "np-branch",
    city: "Вінниця",
    branch: "Відділення №1: вул. Центральна, 12",
    payment: "online",
    lines: [
      ["p-041", 1, 0],
      ["p-052", 1, 0],
      ["p-031", 1, 1],
    ],
    discount: 0.05,
  },
  {
    id: "ZD-240704",
    date: "2026-07-12T17:36:00",
    status: "delivered",
    name: ["Христина", "Левченко"],
    phone: "+380 (68) 240-63-70",
    email: "kh.levchenko@gmail.com",
    method: "ukrposhta",
    city: "Тернопіль",
    branch: "Поштове відділення №23: вул. Лесі Українки, 22",
    payment: "cod",
    lines: [["p-091", 2, 1]],
  },
  {
    id: "ZD-240703",
    date: "2026-07-11T12:18:00",
    status: "cancelled",
    name: ["Дарина", "Осадча"],
    phone: "+380 (99) 118-92-04",
    email: "daryna.os@gmail.com",
    method: "np-branch",
    city: "Черкаси",
    branch: "Відділення №9: просп. Миру, 3",
    payment: "online",
    lines: [["p-072", 1, 0]],
    comment: "Клієнтка попросила скасувати — знайшла інший колір",
  },
  {
    id: "ZD-240702",
    date: "2026-07-10T09:57:00",
    status: "delivered",
    name: ["Наталія", "Гончар"],
    phone: "+380 (67) 601-25-83",
    email: "n.honchar@ukr.net",
    method: "np-locker",
    city: "Львів",
    branch: "Поштомат №41180: вул. Личаківська, 92",
    payment: "online",
    lines: [
      ["p-080", 1, 0],
      ["p-082", 2, 0],
      ["p-033", 1, 0],
    ],
  },
  {
    id: "ZD-240701",
    date: "2026-07-08T19:31:00",
    status: "delivered",
    name: ["Оксана", "Ткаченко"],
    phone: "+380 (93) 455-77-20",
    email: "oksana.tk@gmail.com",
    method: "np-branch",
    city: "Івано-Франківськ",
    branch: "Відділення №11: просп. Чорновола, 16",
    payment: "cod",
    lines: [
      ["p-002", 1, 1],
      ["p-012", 1, 0],
    ],
  },
  {
    id: "ZD-240700",
    date: "2026-07-06T14:03:00",
    status: "delivered",
    name: ["Аліна", "Петренко"],
    phone: "+380 (50) 987-11-64",
    email: "alina.petrenko@gmail.com",
    method: "np-branch",
    city: "Київ",
    branch: "Відділення №148: вул. Ак. Заболотного, 20",
    payment: "online",
    lines: [
      ["p-022", 1, 0],
      ["p-053", 1, 1],
    ],
  },
  {
    id: "ZD-240699",
    date: "2026-07-03T11:44:00",
    status: "delivered",
    name: ["Богдана", "Шевчук"],
    phone: "+380 (96) 302-58-19",
    email: "b.shevchuk@icloud.com",
    method: "ukrposhta",
    city: "Рівне",
    branch: "Поштове відділення №4: вул. Соборна, 47",
    payment: "cod",
    lines: [
      ["p-060", 1, 0],
      ["p-043", 1, 0],
    ],
  },
];

function build(seed: Seed): Order {
  const items = seed.lines.map(([id, qty, colorIndex]) => {
    const p = products.find((x) => x.id === id)!;
    return {
      productId: p.id,
      name: p.name,
      category: p.category,
      color: p.colors[Math.min(colorIndex, p.colors.length - 1)].name,
      qty,
      price: p.price,
    };
  });
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = Math.round(subtotal * (seed.discount ?? 0));
  const shipping = shippingCost(seed.method, subtotal - discount);
  return {
    id: seed.id,
    createdAt: seed.date,
    status: seed.status,
    customer: {
      firstName: seed.name[0],
      lastName: seed.name[1],
      phone: seed.phone,
      email: seed.email,
    },
    delivery: { method: seed.method, city: seed.city, branch: seed.branch },
    payment: seed.payment,
    items,
    subtotal,
    shipping,
    discount,
    total: subtotal - discount + shipping,
    comment: seed.comment,
  };
}

export const mockOrders: Order[] = seeds.map(build);

/** Замовлення, які «вже є» в демо-акаунті покупця */
export const demoCustomerOrderIds = ["ZD-240710", "ZD-240705", "ZD-240700"];

export const statusMeta: Record<
  OrderStatus,
  { className: string; dot: string }
> = {
  new: {
    className: "bg-clay/20 text-clay-2",
    dot: "bg-clay-2",
  },
  processing: {
    className: "bg-sand-2 text-ink-2",
    dot: "bg-ink-3",
  },
  shipped: {
    className: "bg-sky/20 text-[#4f6373]",
    dot: "bg-sage",
  },
  delivered: {
    className: "bg-[#e4efe2] text-[#4d6b48]",
    dot: "bg-[#6f9268]",
  },
  cancelled: {
    className: "bg-[#f2e2e2] text-[#9c5c5c]",
    dot: "bg-[#b97b7b]",
  },
};
