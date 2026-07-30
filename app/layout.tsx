import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

/* Manrope: кириллица + близкий к Plus Jakarta гротеск (Jakarta без cyrillic в Google Fonts) */
const sans = Manrope({
  variable: "--font-jakarta",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danyushin.ru"),
  title: {
    default: "Михаил Данюшин — Fractional AI-инженер",
    template: "%s · Михаил Данюшин",
  },
  description:
    "Fractional AI-инженер и оркестратор IT-процессов для бизнеса: автоматизация, аналитика, AI-интеграции и наведение порядка в IT на retainer.",
  keywords: [
    "Fractional AI engineer",
    "автоматизация бизнеса",
    "аналитика",
    "Power BI",
    "AI-агенты",
    "retainer",
  ],
  authors: [{ name: "Михаил Данюшин" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Михаил Данюшин — Fractional AI-инженер",
    description:
      "Довожу задачи автоматизации, аналитики и AI-интеграций до результата — без штатной единицы в найме.",
    url: "https://danyushin.ru",
    siteName: "Михаил Данюшин",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Михаил Данюшин — Fractional AI-инженер",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Михаил Данюшин — Fractional AI-инженер",
    description:
      "Fractional AI-инженер и оркестратор IT-процессов для бизнеса.",
    images: ["/og-cover.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
