import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ping = searchParams.get('ping') || '??';
    const tier = searchParams.get('tier') || 'UNRANKED';

    // 階級に応じたカラーとメッセージ設定
    let tierColor = '#ffffff';
    let glowColor = 'rgba(255,255,255,0.3)';
    let subMessage = 'EVALUATING CONNECTION...';
    
    if (tier === 'GOD') {
      tierColor = '#FFD700'; // Gold
      glowColor = 'rgba(255,215,0,0.5)';
      subMessage = 'FLAWLESS CONNECTION DETECTED';
    } else if (tier === 'MASTER') {
      tierColor = '#a855f7'; // Purple
      glowColor = 'rgba(168,85,247,0.5)';
      subMessage = 'ELITE TIER PERFORMANCE';
    } else if (tier === 'PLATINUM') {
      tierColor = '#00E5FF'; // Cyan
      glowColor = 'rgba(0,229,255,0.5)';
      subMessage = 'HIGH-SPEED CONNECTION';
    } else if (tier === 'GOLD') {
      tierColor = '#fbbf24'; // Amber
      glowColor = 'rgba(251,191,36,0.5)';
      subMessage = 'OPTIMAL LATENCY';
    } else if (tier === 'SILVER') {
      tierColor = '#9ca3af'; // Gray
      glowColor = 'rgba(156,163,175,0.4)';
      subMessage = 'AVERAGE PERFORMANCE';
    } else if (tier === 'BRONZE') {
      tierColor = '#ef4444'; // Red
      glowColor = 'rgba(239,68,68,0.5)';
      subMessage = 'CRITICAL LATENCY DETECTED';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#050508',
            fontFamily: 'sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 背景のグリッドと光 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.04) 2px, transparent 2px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '60%',
              height: '80%',
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 60%)`,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              right: '-10%',
              width: '70%',
              height: '70%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.15) 0%, transparent 60%)',
            }}
          />

          {/* メインのカードレイアウト（左側に情報、右側に巨大な文字） */}
          <div style={{ display: 'flex', width: '100%', height: '100%', padding: '60px', zIndex: 10 }}>
            
            {/* 左サイド: HUD & 情報 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '45%', borderRight: '2px solid rgba(255,255,255,0.1)', paddingRight: '40px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#00E5FF', fontSize: '18px', letterSpacing: '6px', fontWeight: 'bold', marginBottom: '8px' }}>
                  // GAMER'S LINE
                </div>
                <div style={{ color: '#ffffff', fontSize: '36px', fontWeight: '900', letterSpacing: '2px', lineHeight: 1.1 }}>
                  SPEEDTEST<br />RESULT
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Ping Score Box */}
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ color: '#a1a1aa', fontSize: '14px', letterSpacing: '3px', marginBottom: '4px' }}>LATENCY (PING)</div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span style={{ color: '#ffffff', fontSize: '64px', fontWeight: '900', lineHeight: 1 }}>{ping}</span>
                    <span style={{ color: '#a1a1aa', fontSize: '20px', marginLeft: '8px', fontWeight: 'bold' }}>ms</span>
                  </div>
                </div>

                {/* Sub Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: tierColor, borderRadius: '50%', boxShadow: `0 0 10px ${tierColor}` }} />
                  <div style={{ color: tierColor, fontSize: '14px', letterSpacing: '2px', fontWeight: 'bold' }}>
                    {subMessage}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', color: '#52525b', fontSize: '12px', letterSpacing: '2px', fontFamily: 'monospace' }}>
                SYS.REQ: 2026 / REGION: JP / PROTOCOL: V6
              </div>
            </div>

            {/* 右サイド: 巨大な階級表示 */}
            <div style={{ display: 'flex', width: '55%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                color: 'rgba(255,255,255,0.02)', 
                fontSize: '280px', 
                fontWeight: '900',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                whiteSpace: 'nowrap'
              }}>
                {tier}
              </div>
              
              <div style={{
                color: tierColor,
                fontSize: tier === 'PLATINUM' ? '110px' : '130px', // 文字数によってサイズ調整
                fontWeight: '900',
                letterSpacing: '4px',
                textShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}`,
                zIndex: 20,
                textAlign: 'center'
              }}>
                {tier}
              </div>
              
              {/* 装飾用ボーダー枠 */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px',
                border: `1px solid ${glowColor}`,
                borderLeft: 'none',
                opacity: 0.5
              }}>
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '20px', height: '20px', borderTop: `4px solid ${tierColor}`, borderRight: `4px solid ${tierColor}` }} />
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '20px', height: '20px', borderBottom: `4px solid ${tierColor}`, borderRight: `4px solid ${tierColor}` }} />
              </div>
            </div>

          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
