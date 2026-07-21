/** Англійські версії карток товарів. Ключ — id товару. */
export type ProductEn = {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  sizes?: string[];
};

export const productsEn: Record<string, ProductEn> = {
  "p-001": {
    name: "Arch shelf",
    subtitle: "Wall shelf with a brass profile",
    description:
      "A thin metal profile bends into a soft arch — the shelf almost dissolves into the wall, leaving whatever stands on it in the spotlight. Perfect above a desk, in the bathroom or in the hallway.",
    features: ["Powder coating that resists scratches", "Concealed mounts included", "Holds up to 6 kg"],
    sizes: ["45 cm", "60 cm"],
  },
  "p-002": {
    name: "Duo shelf",
    subtitle: "Two-level shelf on an oak base",
    description:
      "Two surfaces at different heights create a rhythm on the wall. Oak veneer with a matte finish contrasts beautifully with the slim metal.",
    features: ["Natural oak veneer", "Two levels for books and decor", "Mounting with no visible hardware"],
  },
  "p-003": {
    name: "Mint shelf",
    subtitle: "Compact bathroom shelf",
    description:
      "A small shelf with a rim that keeps bottles in place. Slim lines and a moisture-resistant finish — for the bathroom and the kitchen.",
    features: ["Moisture-resistant coating", "Rim around the perimeter", "Mounts with two screws"],
  },
  "p-004": {
    name: "Retro cage shelf",
    subtitle: "Decorative cage-shaped shelf",
    description:
      "An openwork structure that is decor in itself. Dried flowers, candles or a small garland look great inside.",
    features: ["Hand-soldered frame", "Hanging and wall mounts", "Lightweight"],
  },

  "p-010": {
    name: "Ribbed vase",
    subtitle: "Ceramic vase with vertical ribbing",
    description:
      "The soft relief catches the light and draws barely visible shadows on the surface. It looks equally good with a bouquet and completely empty.",
    features: ["Hand-shaped — every vase is unique", "Matte glaze with no shine", "Sealed base, holds water"],
    sizes: ["S · 18 cm", "M · 24 cm", "L · 32 cm"],
  },
  "p-011": {
    name: "Bubble vase",
    subtitle: "Rounded glass vase",
    description:
      "Clear glass with a barely noticeable tint. The round shape and narrow neck keep a bouquet neatly gathered.",
    features: ["Blown glass", "Stable wide base", "Works for dried and fresh flowers"],
  },
  "p-012": {
    name: "Stem vase",
    subtitle: "Tall slim vase",
    description:
      "An elongated silhouette for a single branch or three tulips. Minimum detail — maximum character.",
    features: ["Stable base", "Matte surface", "40 cm tall"],
  },
  "p-013": {
    name: "Tandem vase set",
    subtitle: "Two vases of different heights",
    description:
      "A pair you don't have to match — they already suit each other. Together they build a composition on a dresser or windowsill.",
    features: ["2 vases in the set", "Same glaze tone", "Gift packaging"],
  },

  "p-020": {
    name: "Latex tulips, set of 5",
    subtitle: "Decorative flowers that look alive",
    description:
      "The latex coating even reproduces the matte texture of a petal. The stem bends — you can arrange the bouquet exactly the way you like.",
    features: ["Flexible stem with a wire core", "Won't fade in the sun", "38 cm stem"],
  },
  "p-021": {
    name: "Premium tulips, set of 9",
    subtitle: "A large bouquet with leaves",
    description:
      "Nine flowers with leaves on the stem — the bouquet looks dense and alive. A ready gift that never needs water.",
    features: ["Leaves on every stem", "Dense bud", "Ribbon included"],
  },
  "p-022": {
    name: "Tulips in a vase",
    subtitle: "A ready composition",
    description:
      "A complete set: seven tulips and a ceramic vase matched by tone. Unpack it — and the composition is already on the table.",
    features: ["Vase included", "7 tulips", "Perfect as a gift"],
  },
  "p-023": {
    name: "Mini tulips, set of 3",
    subtitle: "A small accent",
    description:
      "Three short stems for a small vase or a bathroom shelf. The simplest way to add softness to a room.",
    features: ["Short 24 cm stems", "Soft satin sheen", "Three shades to choose from"],
  },

  "p-030": {
    name: "Pearl mug",
    subtitle: "Mug with a pearl relief",
    description:
      "Tiny “pearls” around the body feel good in your palms. 300 ml — exactly one large latte.",
    features: ["300 ml", "Dishwasher safe", "Microwave safe"],
  },
  "p-031": {
    name: "Pair mug set",
    subtitle: "Two mugs with saucers",
    description:
      "Two mugs with saucers in the same tone — for morning coffee together. The soft matte glaze leaves no lip marks.",
    features: ["2 mugs + 2 saucers", "Matte glaze", "Gift box"],
  },
  "p-032": {
    name: "Double-wall glass mug",
    subtitle: "Thermo mug, 350 ml",
    description:
      "Double walls keep the drink warm and your hands cool. A latte looks like a coffee shop display in it.",
    features: ["Double walls", "Heat-resistant borosilicate glass", "350 ml"],
  },
  "p-033": {
    name: "Matcha bowl",
    subtitle: "Wide tea bowl",
    description:
      "A wide bowl with an uneven rim — handmade, and you can tell at first glance. For matcha, cappuccino or simply warm hands.",
    features: ["Hand-shaped", "Uneven rim", "380 ml"],
  },

  "p-040": {
    name: "Crystal organiser",
    subtitle: "Acrylic organiser with 3 sections",
    description:
      "Clear acrylic doesn't clutter the space: you can see everything inside, and the organiser itself seems to disappear on the desk.",
    features: ["3 compartments of different depth", "4 mm clear acrylic", "Non-slip feet"],
  },
  "p-041": {
    name: "Dresser organiser",
    subtitle: "A miniature chest of drawers",
    description:
      "Three pull-out drawers for makeup and jewellery. The velvet inserts keep small things from sliding around.",
    features: ["3 pull-out drawers", "Velvet inserts", "Sturdy construction"],
  },
  "p-042": {
    name: "Bamboo organiser",
    subtitle: "Wooden stand for small things",
    description:
      "Warm bamboo makes a desk feel calmer. The sections fit brushes, pencils and small bottles.",
    features: ["Natural bamboo", "4 sections", "Oil-finished surface"],
  },
  "p-043": {
    name: "Kitchen tray organiser",
    subtitle: "Stand for oils and spices",
    description:
      "It rotates 360° — everything is at hand, nothing needs rearranging. The rim keeps the bottles in place.",
    features: ["360° rotation", "2 cm rim", "Holds up to 8 kg"],
  },

  "p-050": {
    name: "Case makeup bag",
    subtitle: "Structured two-level case",
    description:
      "It keeps its shape even half-empty. The top level is for everyday, the bottom one for everything else.",
    features: ["Two storage levels", "Removable inner tray", "Water-repellent lining"],
  },
  "p-051": {
    name: "Travel makeup bag",
    subtitle: "Soft bag for travelling",
    description:
      "Folds down to the size of your palm yet fits a full skincare set. The inner lining wipes clean easily.",
    features: ["Folds compactly", "Water-resistant fabric", "Two inner pockets"],
    sizes: ["S", "M"],
  },
  "p-052": {
    name: "Brush roll",
    subtitle: "Roll-up brush case",
    description:
      "Rolls up and ties with a ribbon. Every brush has its own pocket and keeps its shape.",
    features: ["12 brush pockets", "Ribbon fastening", "Soft lining"],
  },
  "p-053": {
    name: "Clear makeup bag",
    subtitle: "Transparent bag with trim",
    description:
      "You can see everything at a glance — handy on the road and at airport security. The metal zip never jams.",
    features: ["Clear PVC", "Metal zip", "Loop handle"],
  },

  "p-060": {
    name: "Glass pot, 2.3 l",
    subtitle: "Heat-resistant glass with a glass lid",
    description:
      "Transparent walls let you see every stage of cooking. Glass doesn't absorb smells, so soup and compote never argue.",
    features: ["Heat-resistant glass up to 400 °C", "Oven safe", "Glass lid included"],
    sizes: ["1.7 l", "2.3 l", "3.1 l"],
  },
  "p-061": {
    name: "Granite pot set",
    subtitle: "Three pots with a non-stick coating",
    description:
      "Three sizes for every occasion — from a sauce to soup for the whole family. The granite coating lets you cook with almost no oil.",
    features: ["1.5 / 2.5 / 4 l", "Induction base", "Glass lids with steam vents"],
  },
  "p-062": {
    name: "Milk saucepan",
    subtitle: "Small 1 l saucepan",
    description:
      "For milk, coffee and sauces. Spouts on both sides make pouring easy with either hand.",
    features: ["Spouts on both sides", "Non-stick coating", "Handle stays cool"],
  },

  "p-070": {
    name: "Mushroom lamp",
    subtitle: "Table lamp with soft light",
    description:
      "The round shade diffuses light so that the room feels warmer in the evening. Three brightness levels — from a night light to reading light.",
    features: ["3 brightness levels", "Touch control", "USB-C powered"],
  },
  "p-071": {
    name: "Cloud night light",
    subtitle: "Portable night light",
    description:
      "Warm light with no harsh shadows and a 12-hour battery — take it to any room you like.",
    features: ["12-hour battery", "Silicone body", "Smooth dimming"],
  },
  "p-072": {
    name: "Arch lamp",
    subtitle: "Table lamp with a brass arc",
    description:
      "A thin arc and a laconic shade — a lamp that looks like a sculpture even when switched off.",
    features: ["Warm 2700K light", "In-line dimmer", "Stable marble base"],
  },

  "p-080": {
    name: "Trio candle holders",
    subtitle: "Three glass holders",
    description:
      "Different heights create a rhythm on the table. Glass softens the flame and makes dinner last longer.",
    features: ["3 holders of different heights", "For tea lights", "Thick glass"],
  },
  "p-081": {
    name: "Sculpture candle holder",
    subtitle: "Ceramic holder with a curve",
    description:
      "A smooth wave-shaped curve. It holds a taper candle and works as a standalone object on a shelf during the day.",
    features: ["For taper candles", "Hand-cast", "Stable base"],
  },
  "p-082": {
    name: "Classic candlestick",
    subtitle: "Metal candlestick on a stem",
    description:
      "Calm classics with a slim stem. Looks great in pairs at the ends of a table or in threes in the centre.",
    features: ["Metal stem", "For taper candles", "Two heights available"],
    sizes: ["22 cm", "30 cm"],
  },

  "p-090": {
    name: "Cloud slippers",
    subtitle: "Memory-foam house slippers",
    description:
      "The memory-foam sole takes the shape of your foot after the first day. The upper feels good even on bare feet.",
    features: ["3 cm memory foam", "Non-slip sole", "Hand washable"],
    sizes: ["36-37", "38-39", "40-41", "42-43"],
  },
  "p-091": {
    name: "Quilted slippers",
    subtitle: "Light slippers with a closed toe",
    description:
      "The quilted upper keeps warmth in without overheating. A closed toe — for those who get cold even in summer.",
    features: ["Closed toe", "Light 2 cm sole", "Fold up compactly"],
    sizes: ["36-37", "38-39", "40-41"],
  },
  "p-092": {
    name: "Guest slippers, 2 pairs",
    subtitle: "A set for guests",
    description:
      "Two pairs you won't be embarrassed to offer guests. They store compactly and look like part of the interior.",
    features: ["2 pairs in the set", "One size fits most", "Easy to clean"],
    sizes: ["One size"],
  },
};

/** Технічні характеристики перекладаємо словником термінів — значення короткі й шаблонні. */
const specTerms: [RegExp, string][] = [
  [/Протирати мʼякою вологою серветкою/g, "Wipe with a soft damp cloth"],
  [/Індукція, газ, скловитло/g, "Induction, gas, ceramic hob"],
  [/Жаростійке скло/g, "Heat-resistant glass"],
  [/Боросилікатне скло/g, "Borosilicate glass"],
  [/гранітне покриття/g, "granite coating"],
  [/тоноване скло/g, "tinted glass"],
  [/За попередньою домовленістю/g, "By prior arrangement"],
  [/Всесезонні/g, "All-season"],
  [/Універсальний/g, "One size"],
  [/Мікрофібра/g, "Microfibre"],
  [/Екошкіра/g, "Faux leather"],
  [/Алюміній/g, "Aluminium"],
  [/Кераміка/g, "Ceramic"],
  [/Силікон/g, "Silicone"],
  [/Бамбук/g, "Bamboo"],
  [/Бавовна/g, "Cotton"],
  [/оксамит/g, "velvet"],
  [/Нейлон/g, "Nylon"],
  [/Акрил/g, "Acrylic"],
  [/Латекс/g, "Latex"],
  [/пластик/g, "plastic"],
  [/мармур/g, "marble"],
  [/Плюш/g, "Plush"],
  [/Метал/g, "Metal"],
  [/метал/g, "metal"],
  [/Скло/g, "Glass"],
  [/скло/g, "glass"],
  [/Дуб/g, "Oak"],
  [/ПВХ/g, "PVC"],
  [/каструлі/g, "pots"],
  [/кришки/g, "lids"],
  [/предмети|предметів/g, "pieces"],
  [/чашки/g, "mugs"],
  [/пари/g, "pairs"],
  [/шт/g, "pcs"],
  [/см/g, "cm"],
  [/мАг/g, "mAh"],
  [/кг/g, "kg"],
  [/мл/g, "ml"],
  [/ л/g, " l"],
  [/до /g, "up to "],
  [/, В/g, ", V"],
  [/,/g, "."],
];

const specLabels: Record<string, string> = {
  Матеріал: "Material",
  Розміри: "Dimensions",
  Розмір: "Size",
  Вага: "Weight",
  "Вага пари": "Pair weight",
  Догляд: "Care",
  Висота: "Height",
  "Загальна висота": "Total height",
  Обʼєм: "Volume",
  Діаметр: "Diameter",
  "Діаметр горла": "Neck diameter",
  "У наборі": "In the set",
  Сумісність: "Compatible with",
  Живлення: "Power",
  Акумулятор: "Battery",
  Цоколь: "Socket",
  Сезон: "Season",
  Температура: "Temperature",
  Секцій: "Sections",
  Шухляд: "Drawers",
  Кишень: "Pockets",
};

export function specToEn(spec: { label: string; value: string }) {
  let value = spec.value;
  for (const [re, to] of specTerms) value = value.replace(re, to);
  return { label: specLabels[spec.label] ?? spec.label, value };
}
