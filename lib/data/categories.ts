import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "polytsi",
    accent: "#C2A288",
    title: "Полиці",
    titleOne: "Полиця",
    caption: "Легкі форми для стін",
    description:
      "Настінні полиці з металу та дерева — щоб улюблені дрібниці мали свій маленький п'єдестал.",
  },
  {
    slug: "vazy",
    accent: "#93A68C",
    title: "Вази",
    titleOne: "Ваза",
    caption: "Силует, який тримає тишу",
    description:
      "Скляні, керамічні та рельєфні вази з м'якими лініями — для сухоцвітів, тюльпанів або просто так.",
  },
  {
    slug: "tyulpany",
    accent: "#D9A5A0",
    title: "Тюльпани",
    titleOne: "Тюльпан",
    caption: "Квіти, що не в'януть",
    description:
      "Декоративні тюльпани з латексним покриттям — виглядають як живі, але залишаються з вами назавжди.",
  },
  {
    slug: "chashky",
    accent: "#C9A85C",
    title: "Чашки",
    titleOne: "Чашка",
    caption: "Ранок стає ритуалом",
    description:
      "Чашки й набори з делікатним рельєфом, матовою глазур'ю та приємною вагою в руці.",
  },
  {
    slug: "organaizery",
    accent: "#93A9BC",
    title: "Органайзери",
    titleOne: "Органайзер",
    caption: "Порядок, який видно",
    description:
      "Акрилові та бамбукові органайзери для косметики, прикрас і дрібниць на робочому столі.",
  },
  {
    slug: "kosmetychky",
    accent: "#B49FC0",
    title: "Косметички",
    titleOne: "Косметичка",
    caption: "Компактно й естетично",
    description:
      "М'які та каркасні косметички з водовідштовхувальним покриттям — для дому та подорожей.",
  },
  {
    slug: "kastruli",
    accent: "#A3B598",
    title: "Каструлі",
    titleOne: "Каструля",
    caption: "Кухня в естетиці",
    description:
      "Каструлі зі скляними кришками та антипригарним покриттям — красиві настільки, що не хочеться ховати.",
  },
  {
    slug: "svitylnyky",
    accent: "#D9B183",
    title: "Світильники",
    titleOne: "Світильник",
    caption: "Тепле світло ввечері",
    description:
      "Настільні лампи й нічники з теплим світлом та регулюванням яскравості — для вечірнього настрою.",
  },
  {
    slug: "pidsvichnyky",
    accent: "#C08D8D",
    title: "Підсвічники",
    titleOne: "Підсвічник",
    caption: "Вечері при свічках",
    description:
      "Скляні, металеві та керамічні підсвічники — від мінімалістичних до скульптурних.",
  },
  {
    slug: "tapochky",
    accent: "#A2AEBC",
    title: "Тапочки",
    titleOne: "Тапочки",
    caption: "Дім починається тут",
    description:
      "М'які домашні тапочки з памʼяттю форми та нековзкою підошвою. Найтепліший подарунок.",
  },
];

export const categoryMap: Record<CategorySlug, Category> = categories.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);

export const categoryTitle = (slug: CategorySlug) =>
  categoryMap[slug]?.title ?? slug;
