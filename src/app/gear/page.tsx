import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Cpu, Wifi, Link2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '【2026年版】ゲーマー向け推奨デバイス・通信機器 | Gamer\'s Line',
  description: 'いくら回線を変えても、ルーターやLANケーブルが古いとPingは改善しません。FPSでラグを無くすための最強の通信デバイスを厳選紹介。',
};

export default function GearPage() {
  const breadcrumbs = [
    { name: 'HOME', href: '/' },
    { name: '推奨デバイス', href: '/gear' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 border-b border-white/10 mt-14 sm:mt-0">
        <Breadcrumbs items={breadcrumbs} />
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4 mt-4">
          // GEAR & DEVICES
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          推奨ゲーミング<br className="sm:hidden" />
          <span className="gradient-text">通信デバイス</span>
        </h1>
        <p className="text-sm text-text-muted max-w-[600px] leading-[1.7]">
          いくら最強の光回線を契約しても、「ルーター」や「LANケーブル」が古いとPingは劇的に悪化します。<br className="hidden sm:block" />
          回線変更が難しい方でも、デバイスを変えるだけでラグが解消する最強のギアを厳選しました。
        </p>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 pb-24">
        
        {/* Section 1: Routers (2-3 Columns) */}
        <div className="affi-frame">
          <div className="affi-title-row">
            <div className="flex items-center gap-2">
              <Wifi className="w-6 h-6 text-cyan" />
              <div className="affi-title">おすすめゲーミング<span className="accent">ルーター</span></div>
            </div>
            <div className="affi-subtitle hidden sm:block">// RECOMMENDED ROUTERS</div>
          </div>
          
          <p className="text-sm text-text-muted mb-6 leading-relaxed max-w-3xl">
            Wi-Fi 6（11ax）以上の最新規格に対応し、有線接続時のスループットも高い高性能モデル。
          </p>

          <div className="affi-grid">
            {/* Router 1: High-end */}
            <div className="affi-card featured">
              <div className="affi-card-head">
                <span className="affi-rank">1ST PICK</span>
                <span className="affi-best">BEST BUY</span>
              </div>
              <div className="affi-thumb">
                <img src="https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&w=600&q=80" alt="High-end Router" className="mix-blend-screen" />
              </div>
              <div className="affi-card-body">
                <div className="affi-name">TUF Gaming AX6000 (仮)</div>
                <div className="affi-spec">
                  <span className="affi-spec-tag">Wi-Fi 6</span>
                  <span className="affi-spec-tag">2.5Gポート</span>
                </div>
                <div className="affi-price-row">
                  <span className="affi-price-label">PRICE:</span>
                  <span className="affi-price">¥24,800</span>
                </div>
                <a href="#" className="affi-btn" target="_blank" rel="sponsored">
                  <span className="a-logo">Amazon</span> で見る
                </a>
              </div>
            </div>

            {/* Router 2: Mid-range */}
            <div className="affi-card">
              <div className="affi-card-head">
                <span className="affi-rank">2ND PICK</span>
              </div>
              <div className="affi-thumb">
                <img src="https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&w=600&q=80" alt="Mid-range Router" className="mix-blend-screen opacity-70" />
              </div>
              <div className="affi-card-body">
                <div className="affi-name">Archer AX73 (仮)</div>
                <div className="affi-spec">
                  <span className="affi-spec-tag">Wi-Fi 6</span>
                  <span className="affi-spec-tag">コスパ重視</span>
                </div>
                <div className="affi-price-row">
                  <span className="affi-price-label">PRICE:</span>
                  <span className="affi-price">¥13,500</span>
                </div>
                <a href="#" className="affi-btn" target="_blank" rel="sponsored">
                  <span className="a-logo">Amazon</span> で見る
                </a>
              </div>
            </div>
          </div>
          
          <div className="affi-disclaimer">
            ※価格は記事執筆時点のものです。最新の価格や在庫状況はAmazonのページでご確認ください。
          </div>
        </div>

        {/* Section 2: LAN Cables (1 Column) */}
        <div className="affi-frame">
          <div className="affi-title-row">
            <div className="flex items-center gap-2">
              <Link2 className="w-6 h-6 text-emerald" />
              <div className="affi-title">最強の<span className="text-emerald">LANケーブル</span></div>
            </div>
            <div className="affi-subtitle hidden sm:block">// HIGH-SPEED CABLES</div>
          </div>
          
          <p className="text-sm text-text-muted mb-6 leading-relaxed max-w-3xl">
            Cat5eなどの古いケーブルを使っていると、10G回線を引いても速度が出ません。FPSゲーマーなら「Cat6A（カテゴリ6A）」一択です。
          </p>

          <div className="affi-grid cols-1">
            {/* Cable 1 */}
            <div className="affi-card featured">
              <div className="affi-thumb">
                <img src="https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&w=600&q=80" alt="LAN Cable" className="mix-blend-screen opacity-80" />
              </div>
              <div className="affi-card-body">
                <div className="flex items-center justify-between mb-2">
                  <div className="affi-name text-xl">エレコム LANケーブル Cat6A 爪折れ防止</div>
                  <span className="affi-best">絶対買い</span>
                </div>
                
                <p className="affi-desc mb-2">
                  10Gbps対応、伝送帯域500MHzをクリアするCat6A準拠のスタンダードモデル。ノイズに強いシールド設計で、パケットロスを最小限に抑えます。
                </p>
                <div className="affi-spec">
                  <span className="affi-spec-tag text-emerald border-emerald/30">Cat6A</span>
                  <span className="affi-spec-tag">10Gbps対応</span>
                  <span className="affi-spec-tag">爪折れ防止</span>
                </div>
                
                <div className="affi-btn-wrap">
                  <div className="flex-1">
                    <div className="affi-price-label">PRICE:</div>
                    <div className="affi-price text-2xl">¥1,180</div>
                  </div>
                  <a href="#" className="affi-btn" target="_blank" rel="sponsored">
                    <span className="a-logo">Amazon</span> で見る
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
