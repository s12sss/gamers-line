'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ClientArticleBody({ content }: { content: string }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      const src = (target as HTMLImageElement).src;
      setLightboxImg(src);
    }
    const link = target.closest('a.btn-signup') as HTMLAnchorElement | null;
    if (link) {
      window.gtag?.('event', 'affiliate_click', {
        isp_name: link.textContent?.trim() ?? 'unknown',
        isp_id: 'column',
        link_url: link.href,
      });
    }
  };

  return (
    <>
      <div 
        className="article-body" 
        dangerouslySetInnerHTML={{ __html: content }} 
        onClick={handleClick} 
      />

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
            onClick={() => setLightboxImg(null)}
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={lightboxImg} 
            alt="Enlarged view" 
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
          />
        </div>
      )}
    </>
  );
}
