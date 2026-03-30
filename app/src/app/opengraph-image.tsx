import { ImageResponse } from 'next/og';

export const alt = 'Villa Velebita – Kuća za odmor u Lici, 20 min od Plitvičkih jezera';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#2C1A0E',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#C4622D',
            display: 'flex',
          }}
        />

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px 80px',
          }}
        >
          {/* Location badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#C4622D',
                display: 'flex',
              }}
            />
            <span
              style={{
                color: '#C4622D',
                fontSize: 18,
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Rudopolje · Lika · Hrvatska
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: '#F5EFE6',
              fontSize: 76,
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 20,
              display: 'flex',
            }}
          >
            Villa Velebita
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: '#B8A89A',
              fontSize: 26,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 680,
              display: 'flex',
            }}
          >
            Autentična kameno-drvena kuća za odmor, 20 min od Plitvičkih jezera
          </div>

          {/* Features row */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 48,
            }}
          >
            {[
              { value: '9', label: 'gostiju' },
              { value: '155 m²', label: 'površina' },
              { value: '840 m', label: 'nadmorska visina' },
              { value: '3 noći', label: 'min. boravak' },
            ].map(item => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: '16px 24px',
                  background: 'rgba(196, 98, 45, 0.15)',
                  borderRadius: 12,
                  borderLeft: '3px solid #C4622D',
                }}
              >
                <span
                  style={{
                    color: '#F5EFE6',
                    fontSize: 24,
                    fontFamily: 'Georgia, serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  {item.value}
                </span>
                <span
                  style={{
                    color: '#B8A89A',
                    fontSize: 13,
                    fontFamily: 'system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'flex',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            padding: '20px 80px',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              color: '#B8A89A',
              fontSize: 16,
              fontFamily: 'system-ui, sans-serif',
              display: 'flex',
            }}
          >
            villavelebita.hr
          </span>
          <span
            style={{
              color: '#C4622D',
              fontSize: 16,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            Rezervirajte direktno →
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
