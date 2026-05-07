import { PROVIDER_DETAILS } from '@/data/providerDetails';
import ispsData from '@/data/isps.json';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProviderClientView from '@/components/ProviderClientView';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProviderDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const detail = PROVIDER_DETAILS[resolvedParams.slug];

  if (!detail) {
    notFound();
  }

  // ispIdsに含まれるプランをispsDataからすべて取得する
  const matchingIsps = ispsData.filter((isp) => detail.ispIds.includes(isp.id));
  
  if (matchingIsps.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-cyan selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20 relative z-10">
        <Link href="/provider" className="inline-flex items-center gap-2 text-text-muted hover:text-cyan mb-8 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> 比較一覧に戻る
        </Link>

        {/* Hero Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/10 text-xs font-bold text-cyan tracking-widest mb-6">
            PROVIDER ANALYSIS
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
            {detail.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-relaxed">
            {detail.catchphrase}
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-left">
            {detail.heroDescription}
          </p>
        </div>

        {/* 1G/10G切り替え可能なクライアントビュー */}
        <ProviderClientView detail={detail} isps={matchingIsps} />

      </div>
    </div>
  );
}
