import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gamers-line.jp'),
  title: {
    template: "%s | Gamer's Line",
    default: "Gamer's Line | ゲーマー向け光回線診断・比較メディア",
  },
  description: "Ping値と実質料金の最適解を導き出す、FPSゲーマー特化型の光回線・Ping改善診断メディア。",
  openGraph: {
    title: "Gamer's Line | ゲーマー向け光回線診断・比較メディア",
    description: "Ping値と実質料金の最適解を導き出す、FPSゲーマー特化型の光回線・Ping改善診断メディア。",
    url: 'https://gamers-line.jp',
    siteName: "Gamer's Line",
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gamer's Line | ゲーマー向け光回線診断・比較メディア",
    description: "Ping値と実質料金の最適解を導き出す、FPSゲーマー特化型の光回線・Ping改善診断メディア。",
  },
  verification: {
    google: "e6ITBNtCcTDLYsqRfX5CZrjpS6iYsh_KHRtdzagsXY8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-cyan selection:text-black">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CG4NVWH9B8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CG4NVWH9B8');
          `}
        </Script>

        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
