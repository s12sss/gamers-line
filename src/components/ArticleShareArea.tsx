"use client";

import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';

export default function ArticleShareArea({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTwitterShare = () => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} | Gamer's Line`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-y border-white/10 my-10">
      <span className="text-text-muted font-mono text-[0.75rem] tracking-widest uppercase mr-2 shrink-0">
        Share
      </span>
      <button
        onClick={handleTwitterShare}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2] transition-colors text-[0.8rem] font-bold shrink-0 text-text-muted"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X (Twitter)
      </button>
      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors text-[0.8rem] font-bold shrink-0 ${
          copied 
            ? 'border-emerald/40 bg-emerald/10 text-emerald' 
            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-text-muted hover:text-white'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
        {copied ? 'コピーしました' : 'コピー'}
      </button>
    </div>
  );
}
