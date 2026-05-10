"use client";

import React from 'react';
import Link from 'next/link';

export default function DesignTestPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 sm:p-10">
      <div className="max-w-[760px] mx-auto w-full article-body">
        <h1 className="text-3xl font-bold mb-10 text-cyan">アフィリエイト枠 デザインテスト</h1>

      {/* ────────────────────────────────────────────────────────
          パターン1：1列レイアウト（詳細解説・メイン推し）
      ──────────────────────────────────────────────────────── */}
      <h2 className="text-2xl font-bold mb-4 mt-12 border-b border-white/10 pb-2">パターン1: 1列レイアウト（詳細解説向け）</h2>
      <div className="affi-frame">
        <div className="affi-grid cols-1">
          <div className="affi-card">
            <div className="affi-thumb">
              <img src="https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&w=800&q=80" alt="Pixio PX24Q Pro" />
            </div>
            <div className="affi-card-body">
              <div className="affi-card-head">
                <span className="affi-best">筆者ガチおすすめ</span>
              </div>
              <div className="affi-name">Pixio PX24Q Pro</div>
              <div className="affi-spec">
                <span className="affi-spec-tag">WQHD</span>
                <span className="affi-spec-tag">Fast IPS</span>
                <span className="affi-spec-tag">高リフレッシュレート</span>
              </div>
              <div className="affi-desc">
                筆者が実際に購入して愛用しているモデル。WQHDの高精細と滑らかさを兼ね備え、圧倒的なコスパを誇る。FPSでもMMOでも間違いのない選択肢。
              </div>
              <div className="affi-btn-wrap">
                <div className="affi-price-row mb-2">実売価格: 約24,800円前後</div>
                {/* btn-signup は公式など特に目立たせたい場合に使用 */}
                <a href="#" className="btn-signup">Pixio公式ストアで見る</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          パターン2：2列レイアウト（比較・複数紹介）
      ──────────────────────────────────────────────────────── */}
      <h2 className="text-2xl font-bold mb-4 mt-20 border-b border-white/10 pb-2">パターン2: 2列レイアウト（比較向け）</h2>
      <div className="affi-frame">
        <div className="affi-grid cols-2">
          {/* アイテム1 */}
          <div className="affi-card">
            <div className="affi-thumb">
              <img src="https://images.unsplash.com/photo-1629851603504-2eb9439691b0?auto=format&fit=crop&w=600&q=80" alt="ASUS TUF" />
            </div>
            <div className="affi-card-body">
              <div className="affi-card-head">
                <span className="affi-best">筆者おすすめ</span>
              </div>
              <div className="affi-name">ASUS TUF Gaming AX6000</div>
              <div className="affi-spec">
                <span className="affi-spec-tag">Wi-Fi 6</span>
                <span className="affi-spec-tag">2.5Gポート搭載</span>
              </div>
              <div className="affi-desc">
                ガチ勢向けの最強ルーター。専用のゲーミングポートを搭載し、パケットを最優先処理する。
              </div>
              <div className="affi-btn-wrap mt-auto">
                <div className="affi-price-row mb-2">実売価格: 約22,000円</div>
                <a href="#" className="btn-amazon">Amazonで見る</a>
                <a href="#" className="btn-rakuten">楽天で見る</a>
              </div>
            </div>
          </div>

          {/* アイテム2 */}
          <div className="affi-card">
            <div className="affi-thumb">
              <img src="https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&w=600&q=80" alt="TP-Link" />
            </div>
            <div className="affi-card-body">
              <div className="affi-name">TP-Link Archer AX73</div>
              <div className="affi-spec">
                <span className="affi-spec-tag">Wi-Fi 6</span>
                <span className="affi-spec-tag">コスパ重視</span>
              </div>
              <div className="affi-desc">
                1万円台で買える中で圧倒的なコスパを誇る定番モデル。IPv6に完全対応で夜も安定。
              </div>
              <div className="affi-btn-wrap mt-auto">
                <div className="affi-price-row mb-2">実売価格: 約13,500円</div>
                <a href="#" className="btn-amazon">Amazonで見る</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          パターン3：3列レイアウト（小物やバリエーション紹介）
      ──────────────────────────────────────────────────────── */}
      <h2 className="text-2xl font-bold mb-4 mt-20 border-b border-white/10 pb-2">パターン3: 3列レイアウト（小物・ケーブル等）</h2>
      <div className="affi-frame">
        <div className="affi-grid cols-3">
          {/* アイテム1 */}
          <div className="affi-card">
            <div className="affi-thumb">
              <div style={{width:'100%', height:'100%', background:'#222', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Cat6A Cable
              </div>
            </div>
            <div className="affi-card-body">
              <div className="affi-card-head">
                <span className="affi-best">必須</span>
              </div>
              <div className="affi-name">Cat6A ケーブル 2m</div>
              <div className="affi-spec">
                <span className="affi-spec-tag">ノイズ耐性</span>
              </div>
              <div className="affi-desc text-xs">Pingを極限まで下げるための必須装備。オンラインゲームの最適解。</div>
              <div className="affi-btn-wrap mt-auto">
                <a href="#" className="btn-amazon text-xs py-2">Amazonで見る</a>
              </div>
            </div>
          </div>

          {/* アイテム2 */}
          <div className="affi-card">
            <div className="affi-thumb">
              <div style={{width:'100%', height:'100%', background:'#222', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Switching Hub
              </div>
            </div>
            <div className="affi-card-body">
              <div className="affi-name">2.5G対応 5ポートハブ</div>
              <div className="affi-spec">
                <span className="affi-spec-tag">複数台接続</span>
              </div>
              <div className="affi-desc text-xs">PS5やPCなど複数の機器を有線で繋ぐための分配器。</div>
              <div className="affi-btn-wrap mt-auto">
                <a href="#" className="btn-amazon text-xs py-2">Amazonで見る</a>
                <a href="#" className="btn-rakuten text-xs py-2">楽天で見る</a>
              </div>
            </div>
          </div>

          {/* アイテム3 */}
          <div className="affi-card">
            <div className="affi-thumb">
              <div style={{width:'100%', height:'100%', background:'#222', display:'flex', alignItems:'center', justifyContent:'center'}}>
                PCIe Wi-Fi Card
              </div>
            </div>
            <div className="affi-card-body">
              <div className="affi-name">Wi-Fi 6E PCIeカード</div>
              <div className="affi-spec">
                <span className="affi-spec-tag">無線化</span>
              </div>
              <div className="affi-desc text-xs">どうしても有線が引けない部屋でPingを下げるための増設カード。</div>
              <div className="affi-btn-wrap mt-auto">
                <a href="#" className="btn-amazon text-xs py-2">Amazonで見る</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
