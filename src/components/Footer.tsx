import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 sm:px-10 py-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left bg-background mt-auto">
      <Link href="/" className="font-heading font-bold text-base tracking-tighter text-text no-underline">
        Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
      </Link>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
        <ul className="flex items-center gap-4 text-[0.7rem] sm:text-[0.75rem] text-text-muted">
          <li><Link href="/about" className="hover:text-cyan transition-colors">運営者情報</Link></li>
          <li><Link href="/privacy" className="hover:text-cyan transition-colors">プライバシーポリシー</Link></li>
          <li><Link href="/disclaimer" className="hover:text-cyan transition-colors">免責事項</Link></li>
        </ul>
        <p className="text-[0.65rem] sm:text-xs text-text-dim text-center sm:text-right">
          © {new Date().getFullYear()} Gamer's Line.
        </p>
      </div>
    </footer>
  );
}
