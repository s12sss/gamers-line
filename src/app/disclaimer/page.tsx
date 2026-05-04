import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans pt-[100px] pb-[60px] px-4 sm:px-10">
      <div className="max-w-[800px] mx-auto w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.75rem] text-text-dim mb-8 font-mono uppercase tracking-wider">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cyan">免責事項</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-text">
          免責事項
        </h1>

        <div className="space-y-8 text-[0.95rem] text-text-muted leading-[1.8] glass-card p-6 sm:p-10 rounded-[24px] border border-white/10 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.03),transparent_60%)] pointer-events-none" />

          <p>
            当サイト（Gamer's Line）からのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          
          <p>
            また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。通信速度（Ping値や実効速度等）や料金等の情報は、執筆時点または調査時点のものであり、プロバイダの仕様変更やキャンペーンの終了により最新の情報と異なる場合がございます。
          </p>
          
          <p>
            ご契約やご購入にあたっては、必ずリンク先の公式サイトにて最新の料金・対応エリア・利用規約等をご確認いただきますようお願い申し上げます。
          </p>

          <p>
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
          
        </div>
      </div>
    </div>
  );
}
