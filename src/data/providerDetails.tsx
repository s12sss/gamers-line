import React from 'react';

export interface ProviderDetail {
  slug: string;
  name: string;
  catchphrase: string;
  heroDescription: string;
  ispIds: string[]; // 10G, 1Gなど複数のプランID
  bodyContent: React.ReactNode;
}

export const PROVIDER_DETAILS: Record<string, ProviderDetail> = {
  'eo': {
    slug: 'eo',
    name: 'eo光',
    catchphrase: '関西ゲーマーの特権。圧倒的な安さとPing一桁を叩き出す最強の独自回線',
    heroDescription: '関西エリア（大阪・京都・兵庫・奈良・滋賀・和歌山・福井）にお住まいなら、迷わずeo光一択です。NTT網を使わない「独自回線」のため混雑に強く、特にゲーム用途においては圧倒的なコストパフォーマンスを誇る「eo光シンプルプラン」が最強の選択肢となります。',
    ispIds: ['eo_hikari_10g', 'eo_hikari_1g'],
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> なぜ関西ゲーマーはeo光を選ぶべきなのか？
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <h3 className="text-lg font-bold text-emerald mb-3">ダークファイバー（独自回線）による圧倒的な安定性</h3>
            <p>
              FPSや格闘ゲームにおいて最も重要なのは「Ping（応答速度）」の低さと「パケットロスト」の少なさです。
              eo光は関西電力グループのオプテージが提供する<strong>独自の光ファイバー網</strong>を使用しています。フレッツ光（ドコモ光やソフトバンク光など）のように全国のユーザーと回線をシェアしないため、夜21時以降の「魔の時間帯」でも大渋滞を起こさず、Ping一桁というプロレベルの環境を安定して維持できます。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> ゲーマーの最適解「eo光シンプルプラン」
          </h2>
          <p className="mb-4">
            eo光には、ネット回線のみに特化した「eo光シンプルプラン」と、光電話やテレビがセットになった「eo光ネット」の2種類があります。ゲーマーの方に強くおすすめしたいのは<strong>「eo光シンプルプラン（10ギガ）」</strong>です。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-cyan/20 bg-cyan/5 p-5 rounded-xl">
              <h4 className="font-bold text-cyan mb-2">10ギガが他社より圧倒的に安い</h4>
              <p className="text-sm">他社の10Gbpsプランが月額6,000円〜7,000円台なのに対し、eo光シンプルプランの10ギガは<strong>月額5,500円（税込）</strong>という破格の料金設定です。1ギガ回線とほぼ変わらない料金で、10倍のポテンシャルを持つ回線を手に入れられます。</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">au・UQ・mineoユーザーなら更にお得</h4>
              <p className="text-sm">auやUQモバイルユーザーなら「auスマートバリュー」「自宅セット割」でスマホ代が毎月最大1,100円割引されます。また、格安SIMのmineoユーザーでも毎月330円の割引（シンプルプラン対応）が適用され、通信費全体を大きく圧縮できます。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">03.</span> 注意点：提供エリアが限られている
          </h2>
          <p>
            最強のスペックとコスパを誇るeo光ですが、最大の弱点は<strong>「関西・福井エリアでしか契約できない」</strong>という点です。また、独自回線のため導入にあたって「開通工事」が必須となります。
          </p>
          <div className="mt-4 p-4 border border-yellow-500/30 bg-yellow-500/5 rounded-lg">
            <p className="text-yellow-500 text-sm font-medium">
              💡 マンションにお住まいの方へ<br/>
              賃貸マンションの場合、建物の構造上導入できないケースがあります。まずは公式サイトのボタンから進み、「自分の住所が提供エリア内か（工事可能か）」を判定することをおすすめします。
            </p>
          </div>
        </section>
      </div>
    )
  }
};
