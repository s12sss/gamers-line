'use client';

import { ReactNode } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface Props {
  href: string;
  ispName: string;
  ispId: string;
  className?: string;
  children: ReactNode;
}

export default function AffiliateLink({ href, ispName, ispId, className, children }: Props) {
  const handleClick = () => {
    window.gtag?.('event', 'affiliate_click', {
      isp_name: ispName,
      isp_id: ispId,
    });
  };

  if (!href || href === '#') {
    return (
      <span className={className} title="準備中">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
