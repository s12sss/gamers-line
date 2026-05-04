import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DiagnosisForm from '@/components/DiagnosisForm';

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-neon-cyan selection:text-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-neon-cyan mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> トップページに戻る
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            最適な回線を<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-emerald">見つける</span>
          </h1>
          <p className="text-zinc-400">
            あなたのプレイスタイルと住環境に合わせて、<br className="md:hidden" />最強のゲーミング回線を割り出します。
          </p>
        </div>

        <DiagnosisForm />
      </div>
    </div>
  );
}
