import React from 'react';

export interface ProviderDetail {
  slug: string;
  name: string;
  catchphrase: string;
  heroDescription: string;
  ispIds: string[]; // 10G, 1Gなど複数のプランID
  stats?: {
    ping: number;
    stability: number;
    speed: number;
    cost: number;
    installation: number;
    benefit: number;
  };
  bodyContent: React.ReactNode;
}

export const PROVIDER_DETAILS: Record<string, ProviderDetail> = {
  'eo': {
    slug: 'eo',
    name: 'eo光',
    catchphrase: '関西エリア限定。低Pingと高コスパを両立する地域独自回線',
    heroDescription: '関西エリア（大阪・京都・兵庫・奈良・滋賀・和歌山・福井）限定で提供されている独自回線です。NTT網を使わないため混雑に強く、コストパフォーマンスの高さが特徴です。エリア内であれば有力な選択肢の一つです。',
    ispIds: ['eo_hikari_10g', 'eo_hikari_1g'],
    stats: { ping: 4, stability: 5, speed: 4, cost: 5, installation: 2, benefit: 4 },
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
    stats: { ping: 5, stability: 5, speed: 5, cost: 4, installation: 2, benefit: 5 },
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
  'hi-ho': {
    slug: 'hi-ho',
    name: 'hi-ho ひかり with games',
    catchphrase: 'ゲーマー専用帯域×高性能ルーター。設定不要で手に入る圧倒的低遅延',
    heroDescription: '株式会社ハイホーが提供する、オンラインゲーム特化型の光コラボ回線です。通常の光回線とは異なる「ゲーム専用帯域」を確保しており、さらにゲームに最適な高性能ゲーミングルーターが標準でセットになるため、ネットワークの知識がなくても最高のゲーム環境が手に入ります。',
    ispIds: ['hi-ho_with_games_10g', 'hi-ho_with_games_1g'],
    stats: { ping: 4, stability: 5, speed: 4, cost: 2, installation: 5, benefit: 3 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> 一般通信と分離された「ゲーム専用帯域」
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              hi-ho ひかり with games最大の強みは、一般利用者の通信ルート（動画視聴やWebサイト閲覧など）とは別の<strong>ゲーマー専用の通信ルート（帯域）</strong>を確保している点です。これにより、夜間のゴールデンタイムなど他の人がネットを大量に使っている時間帯でも、ゲームの通信速度やPing値が影響を受けにくく、ラグのない快適なプレイが可能です。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> 高性能ゲーミングルーターがセットで届く
          </h2>
          <p className="mb-4">
            ネット回線がいくら良くても、自宅のWi-Fiルーターが古ければ意味がありません。hi-ho ひかり with gamesでは、専用の高性能ゲーミングルーターが標準でレンタル（セット）提供されます。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-cyan/20 bg-cyan/5 p-5 rounded-xl">
              <h4 className="font-bold text-cyan mb-2">難しい設定は不要</h4>
              <p className="text-sm">届いたルーターを繋ぐだけで、回線のポテンシャルを100%引き出せる最適な設定が完了します。自分で数万円する高価なゲーミングルーターを選ぶ手間もかかりません。</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">31日間月額無料</h4>
              <p className="text-sm">導入時のハードルを下げるため、契約から31日間の月額料金が無料になるキャンペーンが実施されています。初期費用を抑えて最高の環境へ乗り換えるチャンスです。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">03.</span> マンションでも導入しやすい「光コラボ」
          </h2>
          <div className="p-4 border border-cyan/30 bg-cyan/5 rounded-lg mt-4">
            <p className="text-sm font-medium text-cyan">
              💡 NTT回線（フレッツ光）対応エリアなら全国どこでもOK<br/>
              独自回線（NURO光やeo光）が引けないマンションでも、hi-ho ひかり with gamesなら導入可能です。現在ドコモ光やソフトバンク光を使っている場合は、工事なし（事業者変更）で簡単に乗り換えが完了します。
            </p>
          </div>
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
    stats: { ping: 5, stability: 5, speed: 4, cost: 2, installation: 5, benefit: 2 },
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
    stats: { ping: 5, stability: 4, speed: 4, cost: 4, installation: 3, benefit: 5 },
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
    catchphrase: 'プロバイダ「GMOとくとくBB」で速度と高額還元を両立。ドコモユーザー最強の選択',
    heroDescription: 'NTTのフレッツ網を利用する全国対応の光コラボ回線ですが、プロバイダとして「GMOとくとくBB」を選択することで、最新のv6プラス通信による超低遅延と、業界最高クラスの高額キャッシュバックを同時に手に入れることができます。',
    ispIds: ['docomo_hikari_10g', 'docomo_hikari_1g'],
    stats: { ping: 3, stability: 3, speed: 3, cost: 4, installation: 5, benefit: 5 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> ドコモ光は「GMOとくとくBB」が最強な理由
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <h3 className="text-lg font-bold text-emerald mb-3">v6プラス（IPv4 over IPv6）で混雑を徹底回避</h3>
            <p>
              ドコモ光は20社以上のプロバイダから選べますが、ゲーマーが選ぶべきは圧倒的に<strong>「GMOとくとくBB」</strong>です。次世代の通信方式である「v6プラス」に標準対応しており、利用者が集中して回線が重くなる夜間帯でも、専用の空いているルートを通るためPing値が跳ね上がるのを防ぎます。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> ゲーミングルーター無料＆ドコモセット割
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">高性能Wi-Fiルーターが0円</h4>
              <p className="text-sm">GMOとくとくBBを選ぶと、オンラインゲームにも十分対応できるv6プラス対応の高性能Wi-Fiルーターが「無料」でレンタルできます。わざわざ高いルーターを自腹で買う必要がありません。</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">ドコモスマホ代が毎月割引</h4>
              <p className="text-sm">ドコモ光セット割により、ドコモのスマホ料金が毎月最大1,100円割引されます（ahamoは対象外）。家族全員に適用されるため、ドコモユーザーであれば実質的な負担額は他社回線よりも圧倒的に安くなります。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">03.</span> 業界トップクラスの高額キャッシュバック
          </h2>
          <p>
            GMOとくとくBBの特設ページから申し込むことで、数万円単位の高額キャッシュバックや、他社からの乗り換え違約金還元など、強烈な特典を受け取ることができます。回線品質が良いだけでなく、初期費用を大幅に浮かせることができるため非常にコストパフォーマンスの高い選択肢です。
          </p>
        </section>
      </div>
    )
  },
  'softbank': {
    slug: 'softbank',
    name: 'ソフトバンク光',
    catchphrase: 'ソフトバンクユーザーなら外せない、定番の光コラボ',
    heroDescription: 'ソフトバンク・ワイモバイルユーザーならセット割でお得になる光コラボレーション回線です。全国どこでも利用でき、他社からの乗り換え時の違約金満額還元など、手厚いキャンペーンが魅力です。',
    ispIds: ['softbank_hikari_10g', 'softbank_hikari_1g'],
    stats: { ping: 3, stability: 4, speed: 3, cost: 4, installation: 5, benefit: 4 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> ソフトバンクスマホとの強力なセット割
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              「おうち割 光セット」により、家族全員のソフトバンク・ワイモバイルのスマホ料金が毎月割引されます。NURO光が提供エリア外のソフトバンクユーザーにとって、第一の選択肢となります。（※詳細な情報は順次アップデート予定です）
            </p>
          </div>
        </section>
      </div>
    )
  },
  'biglobe': {
    slug: 'biglobe',
    name: 'BIGLOBE光',
    catchphrase: 'au・UQユーザーのもう一つの選択肢',
    heroDescription: 'KDDIグループの老舗プロバイダ「BIGLOBE」が提供する光コラボ回線です。auひかりの提供エリア外でも、auやUQモバイルのセット割を適用できる全国対応の回線です。',
    ispIds: ['biglobe_hikari_10g', 'biglobe_hikari_1g'],
    stats: { ping: 3, stability: 4, speed: 3, cost: 4, installation: 5, benefit: 4 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> IPv6オプションで安定した通信
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              IPv6(IPoE)方式での接続に標準対応しており、光コラボの弱点である夜間の混雑を回避できます。auひかりが導入できないマンションなどにお住まいのauユーザーに最適です。（※詳細な情報は順次アップデート予定です）
            </p>
          </div>
        </section>
      </div>
    )
  },
  'commufa': {
    slug: 'commufa',
    name: 'コミュファ光',
    catchphrase: '東海エリア限定の地域独自回線。低Pingと安定性が強み',
    heroDescription: '東海エリア（愛知・岐阜・三重・静岡・長野）限定で提供されている独自回線です。NTT網を使わない独自インフラで混雑に強く、Ping値・安定性ともに地域内では上位の実力を持ちます。',
    ispIds: ['commufa_hikari_10g', 'commufa_hikari_1g'],
    stats: { ping: 5, stability: 4, speed: 4, cost: 5, installation: 2, benefit: 4 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> 東海地方ゲーマーの特権
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              独自の光ファイバー網を利用しているため、フレッツ光系の回線とは異なり混雑に非常に強いです。東海エリアに住んでいるゲーマーであれば、迷わず候補に入れたいトップクラスの回線です。（※詳細な情報は順次アップデート予定です）
            </p>
          </div>
        </section>
      </div>
    )
  },
  'pikara': {
    slug: 'pikara',
    name: 'ピカラ光',
    catchphrase: '四国エリア限定の地域独自回線',
    heroDescription: '四国電力グループが提供する四国エリア限定の独自回線です。四国地方での高いシェアとauスマホとのセット割が特徴の地域密着型サービスです。Ping値は20ms前後で標準的な水準です。',
    ispIds: ['pikara_hikari_10g', 'pikara_hikari_1g'],
    stats: { ping: 3, stability: 4, speed: 4, cost: 4, installation: 2, benefit: 3 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> 四国地方での高い顧客満足度
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              地域限定の独自回線ならではの安定した通信速度と、手厚いサポートが特徴です。四国エリアにお住まいのauユーザーであれば、通信費を抑えつつ快適なゲーム環境が手に入ります。（※詳細な情報は順次アップデート予定です）
            </p>
          </div>
        </section>
      </div>
    )
  },
  'megaegg': {
    slug: 'megaegg',
    name: 'メガ・エッグ',
    catchphrase: '中国エリア限定の地域独自回線',
    heroDescription: '中国電力グループが提供する中国エリア限定の光回線サービスです。独自のネットワーク網で混雑の影響を受けにくい点が強みです。Ping値は29ms前後で、他の独自回線と比較すると速度面では控えめな水準です。',
    ispIds: ['megaegg_hikari_10g', 'megaegg_hikari_1g'],
    stats: { ping: 2, stability: 3, speed: 3, cost: 4, installation: 2, benefit: 3 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> 中国地方のゲーマーにおすすめ
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p>
              全国規模の回線にありがちな、主要都市のトラフィック増大による速度低下の影響を受けにくいため、中国エリア内で安定したゲームプレイが可能です。（※詳細な情報は順次アップデート予定です）
            </p>
          </div>
        </section>
      </div>
    )
  },

  'bbiq': {
    slug: 'bbiq',
    name: 'BBIQ（ビビック）',
    catchphrase: '九州エリア限定の地域独自回線。安定性が強み',
    heroDescription: '九州エリア（福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島）限定で提供されている独自回線です。九州電力グループのインフラを活用しており、夜間の混雑によるPingスパイクが起きにくい安定性が強みです。ただしPing値は25ms前後で、FPS向けとしては速度面での優位性は限定的です。',
    ispIds: ['bbiq_hikari_10g', 'bbiq_hikari_1g'],
    stats: { ping: 2, stability: 4, speed: 3, cost: 3, installation: 2, benefit: 4 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> なぜ九州ゲーマーはBBIQを選ぶべきなのか？
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <h3 className="text-xl font-bold text-emerald mb-4">独自ファイバー網による「Pingの安定感」</h3>
            <p className="mb-4">
              BBIQ最大の強みは、九州電力のインフラ網を活用した「独自回線」であることです。全国規模の光コラボ回線にありがちな、利用者の集中による夜間のゴールデンタイムの速度低下・Pingスパイク（突発的なラグ）が起こりにくく、常に安定した環境でプレイが可能です。
            </p>
            <p>
              また、auやUQ mobileをお使いの方なら「auスマートバリュー」「自宅セット割」が適用されるため、ランニングコストも大幅に削減できます。
            </p>
          </div>
        </section>
      </div>
    )
  },

  'gaming-plus': {
    slug: 'gaming-plus',
    name: 'Gaming+ (ゲーミングプラス)',
    catchphrase: '回線工事不要。プロバイダ乗り換えだけで手に入る圧倒的低遅延',
    heroDescription: '「光回線の工事ができない」「今のフレッツ光やドコモ光のままでPingを良くしたい」というゲーマーのための、eスポーツ特化型プロバイダです。次世代のIPv6 IPoE接続を利用した専用帯域により、夜間の混雑時でもラグのない快適なプレイ環境を実現します。',
    ispIds: ['gaming-plus_10g', 'gaming-plus_1g'],
    stats: { ping: 4, stability: 4, speed: 3, cost: 1, installation: 5, benefit: 3 },
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> プロバイダを変えるだけでPingが下がる理由
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p className="mb-4">
              日本の光回線の大半は「フレッツ光（NTT網）」を使用していますが、夜間に速度が低下する原因のほとんどは「プロバイダの混雑（網終端装置のパンク）」です。
            </p>
            <p>
              Gaming+は、最新の「v6プラス（IPv4 over IPv6）」技術を採用し、さらに<strong>ゲーマーのために設計された大容量の専用帯域</strong>を確保しています。これにより、一般的なプロバイダで発生する渋滞ルートを完全に回避し、Ping値を劇的に改善することができます。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">02.</span> 工事なし・最短即日で乗り換え完了
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-white/10 bg-white/5 p-5 rounded-xl">
              <h4 className="font-bold text-white mb-2">物理的な配線工事が一切不要</h4>
              <p className="text-sm">現在フレッツ光や光コラボ（ドコモ光・ソフトバンク光など）をご利用中であれば、物理的な工事は一切必要ありません。Webから申し込むだけで、最短即日でネットワークがGaming+に切り替わります。</p>
            </div>
            <div className="border border-cyan/20 bg-cyan/5 p-5 rounded-xl">
              <h4 className="font-bold text-cyan mb-2">最大25日間の無料お試し期間</h4>
              <p className="text-sm">「本当にPingが下がるのか不安…」という方のために、最大25日間の無料お試し期間が用意されています。実際にAPEXやVALORANTをプレイして、Ping値の改善を体感してから継続を決めることができます。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">03.</span> 注意点：別途「回線料金」が必要
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <p className="mb-4">
              Gaming+は「プロバイダのみ」のサービスです。そのため、月額3,278円（税込）のプロバイダ料金のほかに、NTTや光コラボ事業者へ支払う「光回線の基本利用料」が別途発生します。
            </p>
            <p className="mb-4 text-sm">
              例えば、現在お使いの光回線利用料が毎月約5,000円〜6,000円の場合、合計で<strong>毎月8,000円〜9,000円前後</strong>のコストがかかる計算になります。
            </p>
            <p>
              一見すると独自回線（月額5,000〜6,000円台）より割高に見えますが、<strong>「現在の回線の高額な解約違約金」や「撤去工事費・新規開通工事費」をゼロにできる</strong>という圧倒的なメリットがあります。初期費用や手間をかけずに最速でラグを解消したい方にとって、最も合理的な選択肢と言えます。
            </p>
          </div>
        </section>
      </div>
    )
  }

};
