import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  alternates: {
    canonical: '/speedtest',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
