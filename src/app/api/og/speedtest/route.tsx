// app/api/og/speedtest/route.tsx
// Usage: /api/og/speedtest?ping=8&tier=GOD&dl=262
// @vercel/og (Satori) — display:flex only, no grid, no backdrop-filter

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";



const TIER_CONFIG: Record<string, { color: string; glow: string; glow2: string }> = {
  GOD:     { color: "#FFD700", glow: "rgba(255,215,0,0.45)",    glow2: "rgba(255,180,0,0.2)" },
  MASTER:  { color: "#D946EF", glow: "rgba(217,70,239,0.45)",   glow2: "rgba(200,50,220,0.2)" },
  DIAMOND: { color: "#00E5FF", glow: "rgba(0,229,255,0.45)",    glow2: "rgba(0,180,220,0.2)" },
  GOLD:    { color: "#FBBF24", glow: "rgba(251,191,36,0.4)",    glow2: "rgba(230,160,20,0.2)" },
  SILVER:  { color: "#9CA3AF", glow: "rgba(156,163,175,0.35)",  glow2: "rgba(130,140,150,0.15)" },
  BRONZE:  { color: "#EF4444", glow: "rgba(239,68,68,0.4)",     glow2: "rgba(200,40,40,0.2)" },
};

function GridLines() {
  const pcts = [16, 33, 50, 66, 83];
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {pcts.map((p) => (
        <div key={`h${p}`} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: 1, background: "rgba(0,229,255,0.05)" }} />
      ))}
      {pcts.map((p) => (
        <div key={`v${p}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: "rgba(0,229,255,0.05)" }} />
      ))}
    </div>
  );
}

function Corner({ pos, color }: { pos: "tl" | "tr" | "bl" | "br"; color: string }) {
  const size = 28;
  const off = 20;
  const base: React.CSSProperties = { position: "absolute", width: size, height: size, display: "flex" };
  const borders: Record<string, React.CSSProperties> = {
    tl: { top: off, left: off,     borderTop: `2px solid ${color}`, borderLeft:   `2px solid ${color}` },
    tr: { top: off, right: off,    borderTop: `2px solid ${color}`, borderRight:  `2px solid ${color}` },
    bl: { bottom: off, left: off,  borderBottom: `2px solid ${color}`, borderLeft:  `2px solid ${color}` },
    br: { bottom: off, right: off, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return <div style={{ ...base, ...borders[pos] }} />;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ping    = searchParams.get("ping") ?? "---";
  const dl      = searchParams.get("dl")   ?? "---";
  const tierKey = (searchParams.get("tier") ?? "SILVER").toUpperCase();
  const tier    = TIER_CONFIG[tierKey] ?? TIER_CONFIG["SILVER"];
  const c       = tier.color;

  const pingNum    = parseInt(ping);
  const pingBarPct = isNaN(pingNum) ? 50 : Math.max(5, Math.min(100, 100 - pingNum));
  const dlNum      = parseInt(dl);
  const dlBarPct   = isNaN(dlNum)   ? 50 : Math.min(100, Math.max(5, (dlNum / 1000) * 100));

  const fontData = await fetch(new URL('https://gamers-line.jp/fonts/Roboto-Black.ttf')).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, background: "#050508", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", fontFamily: '"RobotoBlack", Arial, sans-serif' }}>

        <GridLines />

        {/* glow blobs */}
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "55%", paddingBottom: "55%", borderRadius: "50%", background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "40%", paddingBottom: "40%", borderRadius: "50%", background: `radial-gradient(circle, ${tier.glow2} 0%, transparent 70%)`, display: "flex" }} />

        {/* watermark */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: 240, fontWeight: 900, color: c, opacity: 0.04, letterSpacing: "-0.03em", whiteSpace: "nowrap", lineHeight: 1, display: "flex" }}>
          {tierKey}
        </div>

        <Corner pos="tl" color={c} />
        <Corner pos="tr" color={c} />
        <Corner pos="bl" color={c} />
        <Corner pos="br" color={c} />

        {/* top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 96px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.4)", fontSize: 16, letterSpacing: "0.22em", fontWeight: 700 }}>
            CONNECTION RANK MASTER
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 900, color: "#f0f0f8" }}>
            <span style={{ marginRight: 8 }}>Gamer's</span><span style={{ color: c }}>Line</span>
          </div>
        </div>

        {/* main */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 84px" }}>

          {/* LEFT: rank 180px */}
          <div style={{ display: "flex", flexDirection: "column", flex: 20, overflow: "visible" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, letterSpacing: "0.28em", fontWeight: 700, marginBottom: 16 }}>YOUR RANK</div>
            <div style={{ fontSize: 140, fontWeight: 900, lineHeight: 0.85, letterSpacing: "-0.02em", color: c, whiteSpace: "nowrap" }}>
              {tierKey}
            </div>
          </div>

          {/* divider */}
          <div style={{ width: 1, height: 300, background: `linear-gradient(180deg, transparent, ${c}50, transparent)`, display: "flex", margin: "0 48px", flexShrink: 0 }} />

          {/* RIGHT: ping + dl */}
          <div style={{ display: "flex", flexDirection: "column", flex: 9 }}>

            {/* Ping */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 4 }}>PING</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 125, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", color: c }}>{ping}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}>ms</div>
              </div>
              <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 8, display: "flex" }}>
                <div style={{ width: `${pingBarPct}%`, height: "100%", background: c, borderRadius: 2, display: "flex" }} />
              </div>
            </div>

            <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.07)", margin: "20px 0", display: "flex" }} />

            {/* Download */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 4 }}>DOWNLOAD</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 125, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", color: "#ffffff" }}>{dl}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}>Mbps</div>
              </div>
              <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 8, display: "flex" }}>
                <div style={{ width: `${dlBarPct}%`, height: "100%", background: "rgba(255,255,255,0.35)", borderRadius: 2, display: "flex" }} />
              </div>
            </div>

          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "0 108px", height: 80 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 16, letterSpacing: "0.18em", fontWeight: 700 }}>SPEEDTEST RESULT</div>
          <div style={{ padding: "10px 28px", border: `1px solid ${c}55`, color: c, fontSize: 16, letterSpacing: "0.18em", fontWeight: 700 }}>
            SHARE YOUR RANK
          </div>
        </div>

      </div>
    ),
    { 
      width: 1200, 
      height: 630,
      fonts: [
        {
          name: 'RobotoBlack',
          data: fontData,
          weight: 900,
          style: 'normal',
        }
      ]
    }
  );
}
