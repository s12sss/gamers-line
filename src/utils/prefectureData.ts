import { RegionId } from './regionData';

export interface Prefecture {
  id: string;
  name: string;
  regionId: RegionId;
}

export const PREFECTURES: Prefecture[] = [
  // 北海道
  { id: 'hokkaido', name: '北海道', regionId: 'hokkaido' },
  // 東北
  { id: 'aomori', name: '青森県', regionId: 'tohoku' },
  { id: 'iwate', name: '岩手県', regionId: 'tohoku' },
  { id: 'miyagi', name: '宮城県', regionId: 'tohoku' },
  { id: 'akita', name: '秋田県', regionId: 'tohoku' },
  { id: 'yamagata', name: '山形県', regionId: 'tohoku' },
  { id: 'fukushima', name: '福島県', regionId: 'tohoku' },
  // 関東
  { id: 'ibaraki', name: '茨城県', regionId: 'kanto' },
  { id: 'tochigi', name: '栃木県', regionId: 'kanto' },
  { id: 'gunma', name: '群馬県', regionId: 'kanto' },
  { id: 'saitama', name: '埼玉県', regionId: 'kanto' },
  { id: 'chiba', name: '千葉県', regionId: 'kanto' },
  { id: 'tokyo', name: '東京都', regionId: 'kanto' },
  { id: 'kanagawa', name: '神奈川県', regionId: 'kanto' },
  // 中部・東海
  { id: 'niigata', name: '新潟県', regionId: 'chubu' },
  { id: 'toyama', name: '富山県', regionId: 'chubu' },
  { id: 'ishikawa', name: '石川県', regionId: 'chubu' },
  { id: 'fukui', name: '福井県', regionId: 'chubu' },
  { id: 'yamanashi', name: '山梨県', regionId: 'chubu' },
  { id: 'nagano', name: '長野県', regionId: 'chubu' },
  { id: 'gifu', name: '岐阜県', regionId: 'chubu' },
  { id: 'shizuoka', name: '静岡県', regionId: 'chubu' },
  { id: 'aichi', name: '愛知県', regionId: 'chubu' },
  { id: 'mie', name: '三重県', regionId: 'chubu' },
  // 関西
  { id: 'shiga', name: '滋賀県', regionId: 'kansai' },
  { id: 'kyoto', name: '京都府', regionId: 'kansai' },
  { id: 'osaka', name: '大阪府', regionId: 'kansai' },
  { id: 'hyogo', name: '兵庫県', regionId: 'kansai' },
  { id: 'nara', name: '奈良県', regionId: 'kansai' },
  { id: 'wakayama', name: '和歌山県', regionId: 'kansai' },
  // 中国
  { id: 'tottori', name: '鳥取県', regionId: 'chugoku' },
  { id: 'shimane', name: '島根県', regionId: 'chugoku' },
  { id: 'okayama', name: '岡山県', regionId: 'chugoku' },
  { id: 'hiroshima', name: '広島県', regionId: 'chugoku' },
  { id: 'yamaguchi', name: '山口県', regionId: 'chugoku' },
  // 四国
  { id: 'tokushima', name: '徳島県', regionId: 'shikoku' },
  { id: 'kagawa', name: '香川県', regionId: 'shikoku' },
  { id: 'ehime', name: '愛媛県', regionId: 'shikoku' },
  { id: 'kochi', name: '高知県', regionId: 'shikoku' },
  // 九州・沖縄
  { id: 'fukuoka', name: '福岡県', regionId: 'kyushu' },
  { id: 'saga', name: '佐賀県', regionId: 'kyushu' },
  { id: 'nagasaki', name: '長崎県', regionId: 'kyushu' },
  { id: 'kumamoto', name: '熊本県', regionId: 'kyushu' },
  { id: 'oita', name: '大分県', regionId: 'kyushu' },
  { id: 'miyazaki', name: '宮崎県', regionId: 'kyushu' },
  { id: 'kagoshima', name: '鹿児島県', regionId: 'kyushu' },
  { id: 'okinawa', name: '沖縄県', regionId: 'kyushu' },
];

export function getPrefectureById(id: string): Prefecture | undefined {
  return PREFECTURES.find(p => p.id === id);
}
