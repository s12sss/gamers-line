import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans pt-[100px] pb-[60px] px-4 sm:px-10">
      <div className="max-w-[800px] mx-auto w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.75rem] text-text-dim mb-8 font-mono uppercase tracking-wider">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cyan">プライバシーポリシー</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-text">
          プライバシーポリシー
        </h1>

        <div className="space-y-12 text-[0.95rem] text-text-muted leading-[1.8] glass-card p-6 sm:p-10 rounded-[24px] border border-white/10">
          
          <section>
            <h2 className="text-xl font-bold text-text mb-4 border-b border-white/10 pb-2">1. 個人情報の利用目的</h2>
            <p>当サイトでは、お問い合わせの際などに名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただく場合がございます。これらの個人情報は、質問に対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、それ以外の目的では利用いたしません。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-4 border-b border-white/10 pb-2">2. アクセス解析ツールについて</h2>
            <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-4 border-b border-white/10 pb-2">3. 広告の配信について</h2>
            <p>当サイトは、A8.net、バリューコマース等のアフィリエイトプログラムを利用しています。商品やサービス等の販売・提供はリンク先のリンク先企業が行っておりますので、ご購入やご契約に関するお問い合わせは各企業様へ直接お願いいたします。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-4 border-b border-white/10 pb-2">4. 個人情報の第三者への開示</h2>
            <p>当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-text-dim">
              <li>本人のご了解がある場合</li>
              <li>法令等への協力のため、開示が必要となる場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-4 border-b border-white/10 pb-2">5. プライバシーポリシーの変更について</h2>
            <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
          </section>

        </div>
      </div>
    </div>
  );
}
