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
        <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0">
          
          <h3 className="font-heading text-xl font-bold text-text mb-2">
            Gamer's Line 編集長
          </h3>
          
          <div className="space-y-3 text-[0.85rem] sm:text-[0.9rem] text-text-muted leading-[1.8] mb-2">
            <p>
              オンラインゲーム歴15年。過去に自身も回線選びに失敗し、深刻なラグや通信切断に悩まされた経験を持っています。
            </p>
            <p>
              インターネット回線は契約期間の縛りがあるため容易には変更できない一方で、公式サイト等には実測のPing値や安定性といったゲーマーにとって最も重要な情報がほとんど記載されていません。さらに、居住地域や建物の設備によって導入可能な回線が異なるため、「結局自分の環境の最適解はどれなのか」を判断することが非常に困難です。
            </p>
            <p>
              ゲーミングデバイス等と異なり、回線は一度契約すると長く付き合うインフラであるにも関わらず、実践的な情報が不足しています。こうしたギャップを埋め、一人でも多くのプレイヤーがご自身の環境に最適な回線を選べるようサポートしたいという思いから、本サイトを立ち上げました。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
