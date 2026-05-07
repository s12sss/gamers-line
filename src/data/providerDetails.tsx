import React from 'react';

export interface ProviderDetail {
  slug: string;
  name: string;
  catchphrase: string;
  heroDescription: string;
  mainIspId: string; // isps.json内の代表プランID（スペック表取得用）
  bodyContent: React.ReactNode;
}

export const PROVIDER_DETAILS: Record<string, ProviderDetail> = {
  'eo': {
    slug: 'eo',
    name: 'eo光',
    catchphrase: '関西ゲーマーの特権。Ping一桁を叩き出す最強の独自回線',
    heroDescription: '関西エリア（大阪・京都・兵庫・奈良・滋賀・和歌山・福井）にお住まいなら、迷わずeo光一択です。NTT網を使わない「独自回線」のため、魔の夜間帯でもパケットロストがなく、安定したPingを維持し続けます。',
    mainIspId: 'eo_hikari_10g',
    bodyContent: (
      <div className="space-y-8 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan">01.</span> なぜ関西ゲーマーはeo光を選ぶべきなのか？
          </h2>
          <p className="mb-4">
            FPSや格闘ゲームにおいて最も重要なのは「Ping（応答速度）」の低さと「パケットロスト（通信の抜け落ち）」がないことです。
            eo光は関西電力グループのオプテージが提供する<strong>独自の光ファイバー網</strong>を使用しています。
          </p>
          <p>
            多くの人が利用するフレッツ光（ドコモ光やソフトバンク光など）は、同じ道路（回線）を皆でシェアするため、夜21時以降になると大渋滞を起こします。しかし、eo光は「専用道路」を持っているため、どれだけ周りが混んでいても自分だけは爆速で通信できるのです。
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 my-8">
          <h3 className="text-lg font-bold text-emerald mb-3">🎮 実際のゲーマーの口コミ・評判</h3>
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-4">
              <p className="text-sm mb-2">「APEXで撃ち負けることが明らかに減った。VDSLからの乗り換えだったけど、Pingが常に一桁で張り付いてる。関西住みで良かったと心から思った。」</p>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <span>プレイタイトル: APEX Legends</span>
                <span>/</span>
                <span>eo光 10Gコース契約</span>
              </div>
            </div>
            <div>
              <p className="text-sm mb-2">「ルーターも無料レンタルできるし、初期費用も実質無料だった。設定も簡単で、工事の人が丁寧だったのも高評価。」</p>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <span>プレイタイトル: VALORANT</span>
                <span>/</span>
                <span>eo光 1Gコース契約</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan">02.</span> 注意点：提供エリアが限られている
          </h2>
          <p>
            最強のスペックを誇るeo光ですが、最大の弱点は<strong>「関西・福井エリアでしか契約できない」</strong>という点です。また、独自回線のため、導入にあたって「開通工事」が必須となります。
          </p>
          <p className="mt-2 text-yellow-500 text-sm">
            ※賃貸マンションにお住まいの場合、建物の構造上導入できないケースがあります。まずは公式ページで「自分の住所が提供エリア内か（工事可能か）」を判定することをおすすめします。
          </p>
        </section>
      </div>
    )
  }
};
