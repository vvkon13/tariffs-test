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
  title: "Тарифы | Пробная неделя",
  description: "Выберите подходящий тариф и начните тренироваться уже сегодня",
  keywords: ["тарифы", "фитнес", "пробная неделя", "подписка"],
  robots: {
    index: true,
    follow: true,
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