import type { ReactNode } from 'react';

// LP専用レイアウト：グローバルヘッダー・フッターを除外
export default function LPLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
