export type CategorySlug =
  | "kosmetychky"
  | "kastruli"
  | "polytsi"
  | "chashky"
  | "tyulpany"
  | "organaizery"
  | "vazy"
  | "svitylnyky"
  | "tapochky"
  | "pidsvichnyky";

export type ProductTag = "new" | "bestseller" | "sale" | "limited";

export type Color = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  colors: Color[];
  sizes?: string[];
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  rating: number;
  reviews: number;
  stock: number;
  tags: ProductTag[];
  createdAt: string;
};

export type Category = {
  slug: CategorySlug;
  /** Акцентний колір категорії — тонує ілюстрації та підписи */
  accent: string;
  title: string;
  titleOne: string;
  caption: string;
  description: string;
};

export type CartLine = {
  productId: string;
  qty: number;
  color: string;
};

export type DeliveryMethod = "np-branch" | "np-locker" | "ukrposhta";
export type PaymentMethod = "online" | "cod";

export type OrderStatus =
  | "new"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  category: CategorySlug;
  color: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  delivery: {
    method: DeliveryMethod;
    city: string;
    branch: string;
  };
  payment: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  comment?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  city?: string;
  createdAt: string;
};
