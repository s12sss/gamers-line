import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 sm:px-10 py-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left bg-background mt-auto">
      <Link href="/" className="font-heading font-bold text-base tracking-tighter text-text no-underline">
        Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
      </Link>
      <p className="text-xs text-text-dim">
        © {new Date().getFullYear()} Gamer's Line. 掲載情報はアフィリエイトリンクを含む場合があります。
      </p>
    </footer>
  );
}
