import DetailedDiagnosisForm from '@/components/DetailedDiagnosisForm';
import { Metadata } from 'next';

// 検索エンジンにインデックスさせない（非公開テスト用）
export const metadata: Metadata = {
  title: 'ゲーマータイプ詳細診断（テスト用） | Gamer\'s Line',
  robots: 'noindex, nofollow',
};

export default function DiagnosisProTestPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-xs font-bold text-yellow-500 tracking-wider mb-6">
            開発中テストページ
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            ゲーマー環境<span className="text-cyan">完全解析</span>
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            15個の質問から、あなたのゲーマータイプと現在の環境の「本当のボトルネック」を特定します。
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <DetailedDiagnosisForm />
        </div>
      </div>
    </div>
  );
}
