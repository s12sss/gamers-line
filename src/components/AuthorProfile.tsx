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
          
          <div className="space-y-3 text-[0.85rem] sm:text-[0.9rem] text-text-muted leading-[1.8] mb-2">
            <p>
              オンラインゲーム歴15年。過去に自分自身が回線選びに失敗し、ラグや回線落ちに苦しんだ経験を持ちます。
            </p>
            <p>
              インターネット回線は「年数縛り」があり簡単には乗り換えられないにも関わらず、公式サイトを見ても実際のスペック（実測Ping値など）は非常に分かりづらいのが現状です。さらに、住んでいる地域や建物の設備によっても対応状況がバラバラです。
            </p>
            <p>
              実態のある商品を選ぶよりも難易度が高いインターネット回線において、少しでも自分にあった回線を選ぶ助けになりたいという思いから本サイトを立ち上げました。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
