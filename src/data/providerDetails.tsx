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
  'hi-ho': {
    slug: 'hi-ho',
    name: 'hi-ho ひかり with games',
    catchphrase: 'ゲーマー専用帯域×高性能ルーター。設定不要で手に入る圧倒的低遅延',
    heroDescription: '株式会社ハイホーが提供する、オンラインゲーム特化型の光コラボ回線です。通常の光回線とは異なる「ゲーム専用帯域」を確保しており、さらにゲームに最適な高性能ゲーミングルーターが標準でセットになるため、ネットワークの知識がなくても最高のゲーム環境が手に入ります。',
    ispIds: ['hiho_with_games_10g', 'hiho_with_games_1g'],
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
    catchphrase: 'プロバイダ「GMOとくとくBB」で速度と高額還元を両立。ドコモユーザー最強の選択',
    heroDescription: 'NTTのフレッツ網を利用する全国対応の光コラボ回線ですが、プロバイダとして「GMOとくとくBB」を選択することで、最新のv6プラス通信による超低遅延と、業界最高クラスの高額キャッシュバックを同時に手に入れることができます。',
    ispIds: ['docomo_hikari_10g', 'docomo_hikari_1g'],
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
    catchphrase: '東海エリア最強の独自回線',
    heroDescription: '東海エリア（愛知・岐阜・三重・静岡・長野）限定で提供されている独自回線です。ゲーマーに特化した専用プランがあり、低Ping・パケットロストゼロの最強環境を構築できます。',
    ispIds: ['commufa_hikari_10g', 'commufa_hikari_1g'],
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
    catchphrase: '四国エリアで安定感抜群の独自網',
    heroDescription: '四国電力グループが提供する四国エリア限定の独自回線です。四国地方での圧倒的なシェアと、auスマホとのセット割が魅力の地域密着型サービスです。',
    ispIds: ['pikara_hikari_10g', 'pikara_hikari_1g'],
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
    catchphrase: '中国エリアの快適ゲームライフを支える独自回線',
    heroDescription: '中国電力グループが提供する中国エリア限定の光回線サービスです。他県からの影響を受けにくい独自のネットワーク網で、安定した通信と低Pingを実現します。',
    ispIds: ['megaegg_hikari_10g', 'megaegg_hikari_1g'],
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
  }
};
