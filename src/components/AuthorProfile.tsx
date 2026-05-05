import { User, Gamepad2, Activity, Zap } from "lucide-react";

export default function AuthorProfile() {
  return (
    <div className="relative glass-card p-6 sm:p-8 rounded-[20px] border border-cyan/20 bg-cyan/[0.02] overflow-hidden">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="shrink-0 relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan/20 to-emerald/20 border-2 border-cyan/30 flex items-center justify-center relative z-10 overflow-hidden">
            {/* TODO: Replace with actual image later using <img src="..." /> */}
            <User className="w-10 h-10 text-cyan opacity-80" />
          </div>
          <div className="absolute inset-0 bg-cyan blur-xl opacity-20 rounded-full" />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-full text-[0.65rem] font-mono text-cyan font-bold tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" /> CHIEF EDITOR
          </div>
          
          <h3 className="font-heading text-xl font-bold text-text mb-2">
            Gamer's Line 編集長
          </h3>
          
          <p className="text-[0.85rem] sm:text-[0.9rem] text-text-muted leading-[1.8] mb-4">
            FPS歴10年以上のハードコアゲーマー。VALORANTやApex Legendsを中心にプレイ。過去にPing値のブレに悩み、自宅の回線環境を幾度となく改善した経験を持つ。カタログスペックの「最大速度」に騙されるゲーマーを一人でも減らすべく、Ping値と実測値に徹底的にこだわった情報を発信中。
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[0.7rem] text-text-dim font-mono">
              <Activity className="w-3 h-3 text-emerald" /> Ping &lt; 15ms
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[0.7rem] text-text-dim font-mono">
              <Zap className="w-3 h-3 text-cyan" /> 10Gbps FTTH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
