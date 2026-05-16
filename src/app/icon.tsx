import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050508',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
        }}
      >
        <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
          {/* Center dot */}
          <circle cx="13" cy="19" r="2.5" fill="#00E5FF" />
          {/* Arc 1 - small */}
          <path
            d="M 8,19 A 5,5 0 0,1 18,19"
            stroke="#00E5FF"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arc 2 - medium */}
          <path
            d="M 4,19 A 9,9 0 0,1 22,19"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          {/* Arc 3 - large */}
          <path
            d="M 0,19 A 13,13 0 0,1 26,19"
            stroke="#00E5FF"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
