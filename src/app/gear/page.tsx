"use client";

import React from 'react';
import Link from 'next/link';
import { Wifi, Link2, Zap, ShieldCheck, AlertTriangle, ChevronRight, CheckCircle2, Network, Cpu } from 'lucide-react';

export default function GearPage() {
  const categories = [
    {
      id: "routers",
      title: "ゲーミングWi-Fiルーター",
      subtitle: "通信の心臓部。回線のポテンシャルを100%引き出すための重要デバイスです。",
      icon: <Wifi className="w-6 h-6 text-cyan" />,
      items: [
        {
          id: "router-high",
          name: "ASUS TUF Gaming AX6000",
          badge: "ガチ勢向け・最強ルーター",
          description: "専用の「ゲーミングLANポート」を搭載し、ゲームの通信パケットを最優先で処理する超高性能ルーター。2.5Gポート搭載で、NUROやauひかりのポテンシャルを100%引き出します。",
          features: ["ゲーム通信を最優先する専用ポート", "2.5Gマルチギガポート搭載", "有線接続と同等の超低遅延Wi-Fi 6"],
          price: "約24,000円",
          color: "from-cyan-500 to-blue-500",
          image: "https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&w=600&q=80",
          amazonLink: "#",
          rakutenLink: "#",
        },
        {
          id: "router-mid",
          name: "TP-Link Archer AX73",
          badge: "コスパ最強・入門ルーター",
          description: "1万円台で買えるWi-Fi 6ルーターの中で圧倒的なコスパを誇る定番モデル。IPv6（IPoE）に完全対応しており、混雑しやすい夜間でも安定したPingを維持できます。",
          features: ["圧倒的なコストパフォーマンス", "IPv6（IPoE）完全対応で夜も快適", "同接台数80台の強力な処理能力"],
          price: "約13,500円",
          color: "from-emerald-500 to-teal-500",
          image: "https://images.unsplash.com/photo-1629851603504-2eb9439691b0?auto=format&fit=crop&w=600&q=80",
          amazonLink: "#",
          rakutenLink: "#",
        }
      ]
    },
    {
      id: "cables",
      title: "LANケーブル",
      subtitle: "Pingを極限まで下げるための必須装備。Cat6Aが現在のオンラインゲームにおける最適解です。",
      icon: <Link2 className="w-6 h-6 text-purple-400" />,
      items: [
        {
          id: "cable-cat6a",
          name: "エレコム LANケーブル Cat6A",
          badge: "オンラインゲーマーの必須装備",
          description: "高品質な光回線を活かすには、それに見合った規格のケーブルを使用することが大切です。ノイズ耐性が高く、10G回線にも完全対応する「Cat6A」はオンラインゲームにおける最適解のひとつです。",
          features: ["10Gbps対応・伝送帯域500MHz", "ノイズに強いシールド設計", "爪折れ防止カバー付き"],
          price: "約1,200円",
          color: "from-purple-500 to-pink-500",
          image: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&w=600&q=80",
          amazonLink: "#",
          rakutenLink: "#",
        }
      ]
    },
    {
      id: "hubs",
      title: "スイッチングハブ",
      subtitle: "PC、PS5、Switchなど複数の機器を有線で繋ぎたい場合の必須アイテム。",
      icon: <Network className="w-6 h-6 text-amber-500" />,
      items: [
        {
          id: "hub-2.5g",
          name: "TP-Link 2.5G対応 5ポートハブ",
          badge: "高速通信を分配",
          description: "家庭の壁にLANポートが1つしかない場合、このハブを使って複数の機器に有線を分配します。一般的な1G対応ハブでは高速通信が制限されてしまうため、将来性を見据えた「2.5G対応ハブ」をおすすめします。",
          features: ["2.5Gbpsの超高速通信を分配", "ファンレスの静音設計", "金属筐体による高い放熱性"],
          price: "約11,000円",
          color: "from-amber-500 to-orange-500",
          image: "https://images.unsplash.com/photo-1623912117565-5c1db270634f?auto=format&fit=crop&w=600&q=80",
          amazonLink: "#",
          rakutenLink: "#",
        }
      ]
    },
    {
      id: "pcie",
      title: "Wi-Fi増設カード",
      subtitle: "どうしても有線LANが引けない部屋で、無線環境のPingを極限まで下げる方法。",
      icon: <Cpu className="w-6 h-6 text-rose-500" />,
      items: [
        {
          id: "wifi-card",
          name: "TP-Link Wi-Fi 6E PCIeカード",
          badge: "無線の限界を突破",
          description: "安定した通信環境を構築するなら、マザーボードに直接接続する「PCIe接続」かつ、外部アンテナを備えたWi-Fi 6E対応カードが最適です。最新の6GHz帯を利用することで、無線環境でも安定したPingを維持しやすくなります。",
          features: ["混雑ゼロの新しい6GHz帯(Wi-Fi 6E)対応", "磁石付きの強力な外部アンテナ付属", "Bluetooth 5.3機能も同時に搭載"],
          price: "約8,500円",
          color: "from-rose-500 to-red-500",
          image: "https://images.unsplash.com/photo-1591405351990-4726e331f26c?auto=format&fit=crop&w=600&q=80",
          amazonLink: "#",
          rakutenLink: "#",
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald/20 rounded-full blur-[100px] -z-10" />
          <div className="font-mono text-[0.7rem] text-emerald tracking-[0.2em] uppercase opacity-70 mb-4">
            // GEAR & DEVICES
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 tracking-tight">
            ラグを無くすための<br />
            <span className="text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">最強ゲーミングデバイス</span>
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            通信の安定性やPingは、大元の光回線だけでなく「ルーター」や「LANケーブル」の性能にも大きく左右されます。
            <br className="mb-2" />
            デバイス環境を見直すだけでラグが劇的に改善するケースも多いため、環境構築に最適な通信ギアを厳選しました。
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center mb-4 text-cyan border border-cyan/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">ルーターの処理能力がPingを決める</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              数世代前のルーターでは、ゲームの激しいデータ通信を処理しきれず、遅延の原因になることがあります。
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">ケーブルは「Cat6A」一択</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Cat5eはノイズに弱く、Cat7/8は家庭環境では逆にノイズを拾いやすくなります。最も安定するのは「Cat6A」です。
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">IPv6（IPoE）対応は必須</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              夜間の混雑を回避する「IPv6通信」を利用するには、ルーター側が対応している必要があります。
            </p>
          </div>
        </div>

        {/* Gear Categories */}
        <div className="space-y-24">
          {categories.map((category) => (
            <div key={category.id} className="space-y-8">
              
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold flex items-center gap-3">
                  {category.icon}
                  {category.title}
                </h2>
                <p className="text-text-muted text-sm sm:text-base ml-[36px]">{category.subtitle}</p>
              </div>

              <div className="space-y-6">
                {category.items.map((gear) => (
                  <div key={gear.id} className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gear.color} rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500`}></div>
                    <div className="relative bg-[#0A0A0F] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center">
                      
                      {/* Photo Thumbnail (Left) */}
                      <div className="w-full lg:w-1/4 aspect-video lg:aspect-auto lg:h-[220px] bg-black/40 border border-white/5 rounded-2xl overflow-hidden relative flex items-center justify-center p-6 flex-shrink-0 group-hover:border-white/10 transition-colors">
                        <img 
                          src={gear.image} 
                          alt={gear.name} 
                          className="w-full h-full object-contain mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                      </div>

                      {/* Info Details (Middle) */}
                      <div className="w-full lg:flex-1 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${gear.color} text-white shadow-sm`}>
                            {gear.badge}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">{gear.name}</h3>
                        <p className="text-text-muted text-sm leading-relaxed pb-4 border-b border-white/5">
                          {gear.description}
                        </p>
                        <ul className="space-y-2 pt-2">
                          {gear.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                              <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons (Right) */}
                      <div className="w-full lg:w-[280px] flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex-shrink-0">
                        <div className="text-sm text-text-muted mb-1">参考価格</div>
                        <div className="text-3xl font-mono font-bold text-white mb-6">
                          {gear.price}
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <a href={gear.amazonLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 flex items-center justify-center gap-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[#f5a623] to-[#ffb732] text-[#1a1a1a] transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(245,166,35,0.2)]">
                            <span className="font-heading font-black text-lg tracking-tight -mt-0.5">Amazon</span> で見る
                          </a>
                          <a href={gear.rakutenLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 flex items-center justify-center gap-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[#bf0000] to-[#d90000] text-white transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(191,0,0,0.2)]">
                            <span className="font-bold text-base -mt-0.5">楽天市場</span> で見る
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note Section (CTA to Diagnosis) */}
        <div className="mt-24 p-8 rounded-3xl bg-cyan/[0.03] border border-cyan/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            デバイスを変えてもラグい場合
          </h3>
          <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-xl mx-auto">
            ルーターとLANケーブルを最強にしてもPingが改善しない場合、大元の「光回線」自体がボトルネック（VDSL方式や、古いIPv4通信など）になっている可能性が極めて高いです。<br />
            まずは無料診断で、ご自宅の環境に最適な回線をチェックしてみましょう。
          </p>
          <Link href="/diagnosis" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan text-black font-bold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            30秒の無料診断を試す
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
