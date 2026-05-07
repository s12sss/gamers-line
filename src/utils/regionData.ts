export type RegionId = 'hokkaido' | 'tohoku' | 'kanto' | 'chubu' | 'kansai' | 'chugoku' | 'shikoku' | 'kyushu';

export interface CoverageStatus {
  has10G: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
  hasNuro: 'COVERED' | 'LIMITED' | 'UNAVAILABLE';
  hasGameWith: 'COVERED' | 'UNAVAILABLE';
  localIsp: string | null;
  advice: string;
}

export const REGION_COVERAGE: Record<RegionId, { name: string, status: CoverageStatus }> = {
  hokkaido: {
    name: '北海道',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: null,
      advice: '北海道はNURO光の恩恵を受けられる広大なエリアです。冬場の引きこもりゲーミングに備え、NUROまたはドコモ・auの光回線を推奨します。10G対応エリアは札幌市周辺など一部に限られます。'
    }
  },
  tohoku: {
    name: '東北',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'LIMITED',
      hasGameWith: 'COVERED',
      localIsp: null,
      advice: '東北地方の一部（宮城など）でNURO光が提供開始されていますが、全体的にはまだ普及途上です。全国対応のGameWith光や、スマホキャリアに合わせた光コラボ回線を選ぶのが最も確実でPingが安定します。'
    }
  },
  kanto: {
    name: '関東',
    status: {
      has10G: 'AVAILABLE',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: null,
      advice: '関東は国内最強の通信インフラを誇ります。10Gプランの普及率が最も高く、FPSガチ勢であればNURO 10Gやauひかり10Gを最優先で導入すべき「恵まれた地域」です。'
    }
  },
  chubu: {
    name: '中部・東海',
    status: {
      has10G: 'AVAILABLE',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: 'コミュファ光',
      advice: '東海地方に住んでいるなら、地域最強の独自網「コミュファ光」のゲーミングカスタムが圧倒的におすすめです。NURO光も強力ですが、ローカル回線のPingの低さは全国トップクラスです。'
    }
  },
  kansai: {
    name: '関西',
    status: {
      has10G: 'AVAILABLE',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: 'eo光',
      advice: '関西エリアの最適解は「eo光」です。独自回線のためフレッツ網の混雑の影響を受けず、10Gコースの普及率も非常に高いです。eo光が引けない場合の代替としてNURO光を検討しましょう。'
    }
  },
  chugoku: {
    name: '中国',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: 'メガ・エッグ',
      advice: '中国地方では独自回線の「メガ・エッグ」が安定感抜群ですが、NURO光も広島・岡山などで広く展開しています。都市部であれば10Gプランの導入も視野に入ります。'
    }
  },
  shikoku: {
    name: '四国',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'UNAVAILABLE',
      hasGameWith: 'COVERED',
      localIsp: 'ピカラ光',
      advice: '四国は現在NURO光の提供エリア外です。そのため、四国電力系の最強ローカル回線「ピカラ光」か、全国対応でPing調整済みの「GameWith光」の2択から選ぶのがゲーマーの鉄則となります。'
    }
  },
  kyushu: {
    name: '九州・沖縄',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: 'BBIQ',
      advice: '九州地方（沖縄除く）はNURO光と地域最強回線「BBIQ（ビビック）」の激戦区です。まずはBBIQの提供エリアか確認し、ダメならNURO光、沖縄の場合はGameWith光やauひかりを推奨します。'
    }
  }
};
