export type RegionId = 'hokkaido' | 'tohoku' | 'kanto' | 'chubu' | 'kansai' | 'chugoku' | 'shikoku' | 'kyushu';

export interface CoverageStatus {
  has10G: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
  hasNuro: 'COVERED' | 'LIMITED' | 'UNAVAILABLE';
  hasGameWith: 'COVERED' | 'UNAVAILABLE';
  hasHiHo: 'COVERED' | 'UNAVAILABLE';
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
      hasHiHo: 'COVERED',
      localIsp: null,
      advice: '北海道はNURO光が使えるのが本当に強いですね！ただ、10Gプランは札幌周辺など一部に限られるので事前のエリア確認は必須です。雪の季節に家で快適にゲームを楽しむなら、NUROか、お使いのスマホのセット割が効く光回線を選ぶと失敗しないですよ！'
    }
  },
  tohoku: {
    name: '東北',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'LIMITED',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: null,
      advice: '東北は宮城などでNURO光が使えるようになってきましたが、まだ全域とは言えない状況です。Pingの安定を最優先するなら、全国どこでも対応しているGameWith光を選ぶか、スマホキャリアに合わせた光コラボ回線を選ぶのが無難で確実です！'
    }
  },
  kanto: {
    name: '関東',
    status: {
      has10G: 'AVAILABLE',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: null,
      advice: '関東はインフラが整っているので、ゲーマーにとっては本当に助かるエリアですよね。10Gプランもかなり普及してきているので、FPSなどで絶対に撃ち負けたくない方は、NURO光やauひかりの10Gプランを最優先でチェックしてみてください！'
    }
  },
  chubu: {
    name: '中部・東海',
    status: {
      has10G: 'AVAILABLE',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: 'コミュファ光',
      advice: '東海エリアにお住まいなら、独自回線である「コミュファ光」のゲーミングカスタムが正直かなりおすすめです！NURO光ももちろん良いのですが、コミュファ光のPingの低さと安定感は全国でもトップクラスなので、一度エリア確認をしてみる価値はありますよ！'
    }
  },
  kansai: {
    name: '関西',
    status: {
      has10G: 'AVAILABLE',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: 'eo光',
      advice: '関西で回線に悩んでいるなら、まずは「eo光」が引けるか確認してみてほしいです！独自回線なので夜間でも混雑しにくく、10Gコースもかなり選べるようになっています。もしeo光がエリア外だった場合は、NURO光を検討するのがベストな流れですね！'
    }
  },
  chugoku: {
    name: '中国',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: 'メガ・エッグ',
      advice: '中国地方は広島・岡山を中心にNURO光が対応しており、独自インフラによる低Pingが期待できます。全国どこでも使えるGameWith光も安定した選択肢です。メガ・エッグは中国地方の地域回線ですが、Ping値・速度ともに上記2回線を優先して検討することをおすすめします。'
    }
  },
  shikoku: {
    name: '四国',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'UNAVAILABLE',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: 'ピカラ光',
      advice: '四国はNURO光の提供エリア外ですが、全国対応のGameWith光が安定した選択肢です。ピカラ光は四国の地域回線として存在しますが、ゲーミング性能ではGameWith光やhi-ho ひかり with gamesを優先して検討することをおすすめします。'
    }
  },
  kyushu: {
    name: '九州・沖縄',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      hasHiHo: 'COVERED',
      localIsp: 'BBIQ',
      advice: '九州はNURO光が広く対応しており、独自インフラによる低Pingが期待できます。GameWith光も全国対応で安定した選択肢です。BBIQは九州の地域回線ですが、ゲーミング性能ではNURO光・GameWith光を優先して検討することをおすすめします。沖縄にお住まいの場合はGameWith光やauひかりが有力です。'
    }
  }
};
