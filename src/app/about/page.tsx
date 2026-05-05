import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AuthorProfile from "@/components/AuthorProfile";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans pt-[100px] pb-[60px] px-4 sm:px-10">
      <div className="max-w-[800px] mx-auto w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.75rem] text-text-dim mb-8 font-mono uppercase tracking-wider">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cyan">運営者情報</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-text">
          運営者情報
        </h1>

        <div className="space-y-10 text-[0.95rem] text-text-muted leading-[1.8]">
          <section className="glass-card p-6 sm:p-8 rounded-[20px] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.05),transparent_70%)] pointer-events-none" />
            
            <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]"></span>
              サイト運営者
            </h2>
            
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-white/10">
                  <th className="py-4 font-semibold text-text w-[120px] align-top">運営者名</th>
                  <td className="py-4">Gamer's Line 運営事務局</td>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="py-4 font-semibold text-text align-top">サイトURL</th>
                  <td className="py-4"><a href="https://gamers-line.jp" className="text-cyan hover:underline">https://gamers-line.jp</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="py-4 font-semibold text-text align-top">お問い合わせ</th>
                  <td className="py-4">x77saku@gmail.com <br/><span className="text-[0.8rem] text-text-dim mt-1 inline-block">※ご連絡は上記メールアドレスまでお願いいたします。</span></td>
                </tr>
                <tr>
                  <th className="py-4 font-semibold text-text align-top">サイトの目的</th>
                  <td className="py-4">FPS・対戦ゲームプレイヤー向けに、Ping値や通信の安定性を重視した最適なインターネット回線の情報提供を行うこと。</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Profile Section */}
          <section>
            <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]"></span>
              運営者プロフィール
            </h2>
            <AuthorProfile />
          </section>
        </div>
      </div>
    </div>
  );
}
