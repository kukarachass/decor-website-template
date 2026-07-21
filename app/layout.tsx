import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toast } from "@/components/ui/Toast";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Žoria Decor — естетичний декор для сучасного дому",
    template: "%s · Žoria Decor",
  },
  description:
    "Декор, полиці, вази, чашки та органайзери для дому. Відправляємо щодня, є накладений платіж.",
};

export const viewport: Viewport = {
  themeColor: "#FBF8F4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.variable}>
      <body className="antialiased">
        <I18nProvider>
          {children}
          <Toast />
        </I18nProvider>
      </body>
    </html>
  );
}
