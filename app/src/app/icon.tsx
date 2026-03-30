import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#2C1A0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#C4622D',
            fontSize: 18,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            display: 'flex',
          }}
        >
          V
        </span>
      </div>
    ),
    { ...size },
  );
}
