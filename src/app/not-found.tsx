import Link from 'next/link';
import { Activity, ShieldAlert, Home, Router } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.05)_0%,transparent_70%)] animate-[bloat_8s_ease-in-out_infinite]" />
        <div className="absolute w-full h-[1px] bg-cyan/20 top-1/2 -translate-y-1/2 shadow-[0_0_15px_var(--cyan)] opacity-50" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 relative flex items-center justify-center">
          <ShieldAlert className="w-24 h-24 text-cyan opacity-80" strokeWidth={1} />
          <div className="absolute inset-0 bg-cyan/20 blur-xl rounded-full" />
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-emerald">
          404
        </h1>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-xs font-bold text-red-400 tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          CONNECTION LOST
        </div>

        <p className="text-text-muted mb-10 max-w-md leading-relaxed text-sm md:text-base">
          アクセスしようとしたページは存在しないか、移動した可能性があります。<br/>
          正しいURLを入力するか、以下のメニューからお探しください。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-text font-bold text-sm transition-all hover:bg-white/10 hover:border-white/20"
          >
            <Home className="w-4 h-4 text-text-muted group-hover:text-cyan transition-colors" />
            トップページへ戻る
          </Link>
          
          <Link
            href="/diagnosis"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-bold text-sm transition-all hover:bg-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <Activity className="w-4 h-4 group-hover:animate-pulse" />
            無料回線診断をはじめる
          </Link>
        </div>
      </div>
    </div>
  );
}
