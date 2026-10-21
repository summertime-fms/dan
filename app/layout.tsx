import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://danyushin.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111155785', 'ym');

ym(111155785, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/111155785"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
