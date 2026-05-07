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
      advice: '北海道はNURO光が使えるのが本当に強いですね！ただ、10Gプランは札幌周辺など一部に限られるので事前のエリア確認は必須です。雪の季節に家で快適にゲームを楽しむなら、NUROか、お使いのスマホのセット割が効く光回線を選ぶと失敗しないですよ！'
    }
  },
  tohoku: {
    name: '東北',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'LIMITED',
      hasGameWith: 'COVERED',
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
      localIsp: 'メガ・エッグ',
      advice: '中国地方にお住まいなら、地域密着型の「メガ・エッグ」がかなり安定していておすすめできます！もちろん広島や岡山ならNURO光も広く対応しているので、ご自宅が10Gプランに対応しているかどうかも含めて、この2つを中心に探してみると良いですよ！'
    }
  },
  shikoku: {
    name: '四国',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'UNAVAILABLE',
      hasGameWith: 'COVERED',
      localIsp: 'ピカラ光',
      advice: '四国はまだNURO光が来ていないんですよね…。でも大丈夫です！四国にお住まいなら、強力な独自回線の「ピカラ光」か、全国対応でPingも安定している「GameWith光」のどちらかを選べば、快適なゲーミング環境が作れるので安心してください！'
    }
  },
  kyushu: {
    name: '九州・沖縄',
    status: {
      has10G: 'LIMITED',
      hasNuro: 'COVERED',
      hasGameWith: 'COVERED',
      localIsp: 'BBIQ',
      advice: '九州（沖縄除く）は、NURO光と地域回線の「BBIQ」の両方が選べるうらやましいエリアです！まずはBBIQが引けるか確認して、難しければNURO光を検討するのがおすすめです。沖縄にお住まいの場合は、GameWith光やauひかりを中心に探すと失敗しにくいですよ！'
    }
  }
};
