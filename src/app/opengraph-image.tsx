import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'そのラグ、回線のせいかも。Gamer\'s Line';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050508',
          backgroundImage: 'radial-gradient(circle at 600px -200px, rgba(0, 229, 255, 0.15), transparent 800px)',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Text Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            zIndex: 10,
          }}
        >
          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.2,
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: '85px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.05em',
                marginBottom: '10px',
              }}
            >
              そのラグ、
            </span>
            <span
              style={{
                fontSize: '110px',
                fontWeight: 900,
                color: '#00e5ff',
                letterSpacing: '-0.05em',
              }}
            >
              回線のせいかも。
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                fontSize: '28px',
                color: '#94a3b8',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              今のプレイ環境を選択するだけで、
            </span>
            <span
              style={{
                fontSize: '28px',
                color: '#94a3b8',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              あなたに本当に必要なゲーミング回線をたった30秒で無料診断
            </span>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
