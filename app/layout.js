import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Quién Me Representa - Directorio del Congreso de México',
  description: '¡NO AL IMPUESTO A VIDEOJUEGOS! Encuentra y contacta a tus Diputados y Senadores de México. #elgamingsalva',
  keywords: ['México', 'Congreso', 'Diputados', 'Senadores', 'videojuegos', 'impuesto', 'elgamingsalva'],
  authors: [{ name: 'Comunidad Gaming México' }],
  openGraph: {
    title: 'Quién Me Representa - Directorio del Congreso de México',
    description: '¡NO AL IMPUESTO A VIDEOJUEGOS! Encuentra y contacta a tus representantes.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
