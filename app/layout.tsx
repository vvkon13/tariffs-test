//app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Raleway, Manrope } from "next/font/google";
import "./globals.css";
import { TimerProvider } from '@/contexts/TimerContext';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const manrope = Manrope({ 
  variable: "--font-gilroy", // вместо gilroy
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Тарифы | Фитнес-программа",
  description: "Выберите подходящий тариф и начните тренироваться уже сегодня. Пробная неделя со скидкой до 70%.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "Фитнес-тарифы | Начни меняться сегодня",
    description: "Персональные программы тренировок. Скидки до 70% при оформлении в течение 2 минут.",
    type: "website",
    locale: "ru_RU",
    url: 'https://tariffs-test.vercel.app/',
    siteName: "FitHub Tariffs",
    images: [
      {
        url: 'https://tariffs-test.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: "Фитнес-тарифы — выбери свой план тренировок",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Фитнес-тарифы | Скидки до 70%",
    description: "Персональные программы тренировок. Успей оформить со скидкой!",
    images: ['https://tariffs-test.vercel.app/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${raleway.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg-dark text-text-primary font-montserrat antialiased">
        <TimerProvider duration={120} warningThreshold={30}>
        {children}
        </TimerProvider>
      </body>
    </html>
  );
}