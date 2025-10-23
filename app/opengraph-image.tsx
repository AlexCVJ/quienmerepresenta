import { ImageResponse } from 'next/og';

// Configuración de la imagen
export const runtime = 'edge';
export const alt = 'NO al Impuesto a Videojuegos México - #elgamingsalva';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Patrón de fondo */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255, 255, 255, 0.1) 35px,
              rgba(255, 255, 255, 0.1) 70px
            )`,
          }}
        />

        {/* Contenido principal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            zIndex: 1,
          }}
        >
          {/* Texto principal */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0',
                textAlign: 'center',
                lineHeight: 1.2,
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              ¡NO AL IMPUESTO
            </h1>
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0',
                textAlign: 'center',
                lineHeight: 1.2,
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              A VIDEOJUEGOS!
            </h1>
          </div>

          {/* Badge de impuesto */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '20px 40px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ff4444',
                background: 'white',
                padding: '10px 30px',
                borderRadius: '12px',
              }}
            >
              8% México 2026
            </span>
          </div>

          {/* Hashtag */}
          <div
            style={{
              display: 'flex',
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#ffd700',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: '30px',
            }}
          >
            #elgamingsalva
          </div>

          {/* Llamado a la acción */}
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.95)',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Contacta a tus Diputados y Senadores
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          🎮 quienmerepresenta.mx
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
