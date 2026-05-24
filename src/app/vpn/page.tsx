"use client";

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, Zap, Globe, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Tooltip from '@/components/Tooltip';

export default function VpnPage() {
  const vpnList = [
    {
      id: "nordvpn",
      name: "NordVPN",
      badge: "圧倒的No.1・最速",
      description: "独自の「NordLynx」プロトコルにより、VPN接続時でもPingの悪化を極限まで抑えます。CoDのBotロビー探しやAPEXの海外サーバー接続に最も使われている定番中の定番。",
      features: ["超高速NordLynxプロトコル", "世界111ヶ国・6000台以上のサーバー", "強力なDDoS保護とノーログポリシー"],
      price: "約450円〜/月",
      color: "from-blue-500 to-cyan-500",
      link: "https://px.a8.net/svt/ejp?a8mat=4B3LMN+BLYBG2+3YFI+61Z81"
    },
    {
      id: "expressvpn",
      name: "ExpressVPN",
      badge: "ガチ勢向け・最高安定度",
      description: "料金は少し高めですが、通信の安定性とPingの低さにおいては業界トップクラス。1msのラグも許せないハードコアゲーマーが最終的に行き着くプロ仕様のVPNです。",
      features: ["業界最高水準の安定性", "105ヶ国の超高速サーバー", "24時間対応のチャットサポート"],
      price: "約1,000円〜/月",
      color: "from-red-500 to-orange-500",
      link: "https://px.a8.net/svt/ejp?a8mat=4B3LMN+BPIX2Q+5JSS+5YRHE"
    },
    {
      id: "millenvpn",
      name: "MillenVPN",
      badge: "完全国産・安心サポート",
      description: "海外製が多いVPNの中で、日本の企業（アズポケット株式会社）が運営する数少ない国産VPN。設定画面もサポートも完全日本語なので、初めてのVPNでも迷わず使えます。",
      features: ["日本の法律に準拠した運営", "完全日本語の使いやすいアプリ", "月額396円からの神コスパ"],
      price: "396円〜/月",
      color: "from-emerald-500 to-teal-500",
      link: "https://px.a8.net/svt/ejp?a8mat=4B3LMN+BUADWY+3JTE+HV7V6"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ name: 'HOME', path: '/' }, { name: 'VPN特集', path: '/vpn' }]} />
        {/* Header Section */}
        <div className="text-center mb-16 relative mt-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/20 rounded-full blur-[100px] -z-10" />

          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 tracking-tight">
            ゲーマーのための<br />
            <span className="text-cyan drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">最強VPN</span>ガイド
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            回線工事ができない？<Tooltip text="通信の応答速度（遅延）。この数値が低いほどラグがなくなります。">Ping</Tooltip>をこれ以上下げられない？<br className="hidden sm:block" />
            それなら「<Tooltip text="データが目的地（ゲームサーバー）に到達するまでの通信経路のこと。">ルーティング</Tooltip>（経路）の最適化」で物理的な壁を越えよう。<br className="hidden sm:block" />
            <Tooltip text="Skill-Based Matchmakingの略。自分と同じ実力のプレイヤーと強制的にマッチングさせられるシステム。">SBMM</Tooltip>回避や<Tooltip text="意図的に大量の通信を送りつけ、回線をパンクさせてゲームから切断させる悪質な攻撃。">DDoS攻撃</Tooltip>対策にも必須のゲーミングVPNを厳選しました。
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center mb-4 text-cyan border border-cyan/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2"><Tooltip text="通信の応答速度（遅延）。この数値が低いほどラグがなくなります。">Ping</Tooltip>と<Tooltip text="通信中にデータの一部が失われる現象。キャラクターが瞬間移動する原因になります。">パケロス</Tooltip>の改善</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              プロバイダの粗悪な通信経路を回避し、VPNの最適化された専用ルートを通ることで、ラグが劇的に改善する場合があります。
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">海外サーバー・<Tooltip text="Skill-Based Matchmakingの略。自分と同じ実力のプレイヤーと強制的にマッチングさせられるシステム。">SBMM</Tooltip>回避</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              CoDなどで「エジプト」などの緩いサーバー（Botロビー）に接続したり、APEXでチーターの少ない海外鯖に繋ぐことができます。
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2"><Tooltip text="意図的に大量の通信を送りつけ、回線をパンクさせてゲームから切断させる悪質な攻撃。">DDoS攻撃</Tooltip>・特定対策</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              自分の本当のIPアドレスを隠すことで、悪意のあるプレイヤーからの<Tooltip text="意図的に大量の通信を送りつけ、回線をパンクさせてゲームから切断させる悪質な攻撃。">DDoS攻撃</Tooltip>や個人特定の脅威から完全に身を守ります。
            </p>
          </div>
        </div>

        {/* VPN List */}
        <div className="space-y-8">
          <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyan rounded-full"></span>
            厳選ゲーミングVPN 3強
          </h2>

          {vpnList.map((vpn, index) => (
            <div key={vpn.id} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${vpn.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
              <div className="relative bg-[#0A0A0F] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
                
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${vpn.color} text-white`}>
                      {vpn.badge}
                    </span>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-white">{vpn.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed pb-4 border-b border-white/5">
                    {vpn.description}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {vpn.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                        <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <div className="text-sm text-text-muted mb-1">最安プラン目安</div>
                  <div className="text-3xl font-mono font-bold text-white mb-6">
                    {vpn.price}
                  </div>
                  <a href={vpn.link} target="_blank" rel="noopener noreferrer" className={`w-full py-4 flex items-center justify-center rounded-lg text-base font-bold bg-gradient-to-r ${vpn.color} hover:opacity-90 transition-opacity border-0 text-white shadow-lg`}>
                    公式サイトで申し込む
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Note Section */}
        <div className="mt-16 p-6 rounded-2xl bg-cyan/5 border border-cyan/10 text-center">
          <p className="text-sm text-text-muted">
            <strong className="text-cyan">💡 ワンポイントアドバイス:</strong><br />
            多くのVPNサービスは「30日間返金保証」が付いています。<br />
            まずは自分の環境でPingが下がるか、海外サーバーで快適に遊べるかをお試しで契約してテストしてみるのが最も賢い選び方です。
          </p>
        </div>

      </div>
    </div>
  );
}
