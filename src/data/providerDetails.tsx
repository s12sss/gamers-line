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
            eo光には、ネット回線のみに特化した「eo光シンプルプラン」と、光電話やテレビがセットになった「eo光ネット」の2種類があります。ゲーマーの方におすすめしたいのは、余計なオプションが省かれた<strong>「eo光シンプルプラン」</strong>です。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-cyan/20 bg-cyan/5 p-5 rounded-xl">
              <h4 className="font-bold text-cyan mb-2">1Gプランでも十分すぎる性能と安さ</h4>
              <p className="text-sm">オンラインゲームは実はそれほど通信帯域を消費しないため、独自の光ファイバー網であるeo光なら<strong>1GプランでもPing一桁の快適なプレイが十分に可能</strong>です。さらに、実質月額も非常に安く抑えられているため、コストパフォーマンスは抜群です。※もちろん、配信や超大容量アップデートを頻繁に行うヘビーユーザー向けの10Gプランも選択可能です。</p>
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
  },
  'nuro': {
    slug: 'nuro',
    name: 'NURO光',
    catchphrase: '標準で2Gbps。プロゲーマーも愛用する圧倒的なスピード',
    heroDescription: 'ソニーネットワークコミュニケーションズが提供するNURO光は、標準プランで「下り最大2Gbps」という驚異的なスピードを誇ります。プロeスポーツチームも採用するほどの回線品質と、高額なキャッシュバックが魅力です。',
    ispIds: ['nuro_hikari_10g', 'nuro_hikari_2g'],
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> ダークファイバーを活用した「混まない」回線
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              NURO光の最大の強みは、NTTの光ファイバー網のうち使用されていない「ダークファイバー」を独自に活用している点です。他の光コラボレーション系回線とは物理的に異なる経路を使用するため、利用者が増える夜間でも速度低下が起きにくく、安定したPing値を維持できます。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> ソニー製ルーター無料＆高額キャッシュバック
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">Wi-Fiルーターが無料で使える</h4>
              <p className="text-sm">NURO光を契約すると、ONU（回線終端装置）と一体型になった高性能なWi-Fiルーターが無料でレンタルされます。自分で高価なゲーミングルーターを買わなくても、最初から快適な環境が整います。</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">ソフトバンクユーザーの特権</h4>
              <p className="text-sm">ソフトバンク・ワイモバイルのスマホをお使いであれば「おうち割 光セット」が適用され、毎月のスマホ代が最大1,100円割引されます。NURO自体もキャッシュバックが大きいので、実質的な負担を大きく減らせます。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">03.</span> 注意点：開通工事に時間がかかるケースも
          </h2>
          <p>
            NURO光は独自回線のため、基本的に「宅内」と「屋外」の2回の工事が必要になります。申し込みのタイミングやエリアによっては、開通までに1〜2ヶ月程度かかる場合があるため、引っ越しなどに合わせて導入する場合は早めの申し込みが推奨されます。
          </p>
        </section>
      </div>
    )
  },
  'gamewith': {
    slug: 'gamewith',
    name: 'GameWith光',
    catchphrase: 'ゲーム攻略メディアが本気で作った「ゲーマー専用」光コラボ',
    heroDescription: '国内最大級のゲームメディア「GameWith」が提供するゲーミング専用回線です。全国どこでも使える「光コラボ」でありながら、ゲームの通信を優先する専用帯域を確保しているため、光コラボ特有のラグや遅延を極限まで抑え込みます。',
    ispIds: ['gamewith_hikari_10g', 'gamewith_hikari_1g'],
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> 光コラボなのに「ゲームの通信」を優先処理
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              通常の光コラボ回線は、動画を見る人もゲームをする人も同じ「帯域」を共有するため、夜間に混雑しがちです。しかしGameWith光は、<strong>ゲームサーバーへの通信経路を最適化</strong>し、専用の帯域を確保しています。これにより、APEXやVALORANTといった主要タイトルにおいて、安定した低Pingを実現しています。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> 全国エリア対応で導入ハードルが低い
          </h2>
          <p className="mb-4">
            eo光やNURO光のような独自回線とは違い、GameWith光はNTTのフレッツ網を利用する「光コラボ」です。そのため、<strong>全国のほぼ全てのエリアで利用可能</strong>であり、すでにフレッツ光やドコモ光・ソフトバンク光などを利用している場合は、工事不要（事業者変更）で簡単に乗り換えることができます。
          </p>
          <div className="p-4 border border-cyan/30 bg-cyan/5 rounded-lg mt-4">
            <p className="text-sm font-medium text-cyan">
              💡 独自回線が引けなかった人への「最後の切り札」<br/>
              賃貸マンションの都合でNURO光などが導入できない場合、光コラボであるGameWith光が最も安定したゲーム環境を構築する現実的な選択肢になります。
            </p>
          </div>
        </section>
      </div>
    )
  },
  'au': {
    slug: 'au',
    name: 'auひかり',
    catchphrase: '独自網による圧倒的安定感。auユーザーならさらに神コスパ',
    heroDescription: 'KDDIが自社で保有する独自の光ファイバー網を利用した光回線です。NTT回線とは異なるネットワークを使用しているため、夜間の混雑時でもパケットロストが少なく、安定したPing値を維持できます。auユーザーなら割引の恩恵が絶大です。',
    ispIds: ['au_hikari_10g', 'au_hikari_1g'],
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> NTT回線の混雑と無縁の「KDDI独自網」
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              auひかり最大のメリットは、フレッツ光とは別の「KDDI独自の回線網」を使用している点です（一部エリアを除く）。道路で例えるなら「auひかり専用の高速道路」を持っている状態なので、多くの人がネットに繋ぐ夜の時間帯でも渋滞が発生せず、常にクリアな通信品質でゲームがプレイできます。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> 業界トップクラスの超高額キャッシュバック
          </h2>
          <p className="mb-4">
            auひかりは、優良代理店経由で申し込むことで<strong>数万円〜最大10万円近い超高額キャッシュバック</strong>を受け取ることができます。さらに、他社からの乗り換え時に発生する違約金もKDDIが大幅に負担してくれるため、「今の回線の解約金がネックで乗り換えられない」という方にも最適です。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">au・UQユーザーはマスト</h4>
              <p className="text-sm">「auスマートバリュー」および「自宅セット割」により、家族全員のスマホ代が毎月最大1,100円安くなります。回線品質と経済面の両方で文句なしの選択です。</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">関西・東海はエリア外に注意</h4>
              <p className="text-sm">独自回線の都合上、関西エリア（eo光の提供エリア）や東海エリア（コミュファ光の提供エリア）では、auひかりの戸建てプランを契約することができません。</p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  'docomo': {
    slug: 'docomo',
    name: 'ドコモ光',
    catchphrase: 'プロバイダ「OCN」のTier1バックボーンで光コラボ最高峰の安定性',
    heroDescription: 'NTTのフレッツ網を利用する全国対応の光コラボ回線ですが、プロバイダとして「OCNインターネット」を選択することで、世界最高水準のネットワーク基盤（Tier1）に直結できます。ドコモユーザーなら一択の回線です。',
    ispIds: ['docomo_hikari_10g', 'docomo_hikari_1g'],
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> 世界最高水準「Tier1」バックボーンの強み
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <h3 className="text-lg font-bold text-emerald mb-3">プロバイダ選びが運命を分ける</h3>
            <p>
              ドコモ光はプロバイダを複数から選べますが、ゲーマーが選ぶべきは圧倒的に<strong>「OCNインターネット」</strong>です。OCNは世界でも限られた事業者しか持てない「Tier1」というインターネットの最上位ネットワーク網を持っています。データの経由地が少なくなるため、光コラボでありながら極めて安定した通信を実現します。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> Wi-Fi 7ルーターが激安＆ドコモセット割
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">最新ルーターを優待価格で</h4>
              <p className="text-sm">OCNインターネットを選ぶと、次世代規格である「Wi-Fi 7」対応の高性能ルーターが数千円〜という大幅な優待価格で購入できます。無線でも快適にゲームをしたい方には大きなメリットです。</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">ドコモユーザーなら絶対コレ</h4>
              <p className="text-sm">ドコモ光セット割により、ドコモのスマホ料金が毎月最大1,100円割引されます（ahamoは対象外）。他社の独自回線でドコモのセット割が使えるところはないため、ドコモユーザーの最適解となります。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">03.</span> 初期設定をプロにお任せ可能
          </h2>
          <p>
            光回線の導入にあたって、「ルーターの設定」や「IPv6（v6プラス）の接続設定」などが不安な方でも、OCNインターネットなら初回無料で専門スタッフによる「訪問サポート」を受けることができます。
          </p>
        </section>
      </div>
    )
  }
};
