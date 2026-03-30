import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#2C1A0E',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <span
          style={{
            color: '#C4622D',
            fontSize: 80,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            lineHeight: 1,
            display: 'flex',
          }}
        >
          V
        </span>
        <span
          style={{
            color: '#F5EFE6',
            fontSize: 20,
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.1em',
            display: 'flex',
          }}
        >
          VILLA
        </span>
      </div>
    ),
    { ...size },
  );
}
