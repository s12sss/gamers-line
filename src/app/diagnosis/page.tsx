import type { Metadata } from "next";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DiagnosisForm from '@/components/DiagnosisForm';
import Breadcrumbs from '@/components/Breadcrumbs';


export const metadata: Metadata = {
  alternates: {
    canonical: '/diagnosis',
  },
};

export default async function DiagnosisPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const { genre } = await searchParams;
  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: "ゲーミング回線 診断ツール | Gamer's Line",
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    description: "プレイスタイルや居住環境から、あなたに最適なゲーミング回線を30秒で無料診断するツールです。",
    offers: {
      '@type': 'Offer',
      price: "0",
      priceCurrency: "JPY"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-neon-cyan selection:text-black py-6 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[
          { name: 'HOME', path: '/' },
          { name: '回線診断', path: '/diagnosis' }
        ]} />

        <div className="text-center mb-5 mt-3">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            最適な回線を<span className="gradient-text">見つける</span>
          </h1>
          <p className="text-zinc-400">
            あなたのプレイスタイルと住環境に合わせて、<br className="md:hidden" />最強のゲーミング回線を提案します。
          </p>
        </div>

        <DiagnosisForm initialGenre={genre} />
      </div>
    </div>
  );
}
