import { Roboto } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = 'https://quienmerepresenta.mx';
const siteName = 'Quién Me Representa';
const siteDescription = '¡NO AL IMPUESTO DEL 8% A VIDEOJUEGOS EN MÉXICO 2026! Encuentra y contacta a tus Diputados y Senadores del Congreso de México. Haz que tu voz sea escuchada. #elgamingsalva';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NO al Impuesto a Videojuegos México 2026 | Contacta a tus Diputados y Senadores | #elgamingsalva',
    template: '%s | Quién Me Representa'
  },
  description: siteDescription,
  keywords: [
    'impuesto videojuegos méxico',
    'impuesto 8% videojuegos 2026',
    '#elgamingsalva',
    'el gaming salva',
    'contactar diputados méxico',
    'contactar senadores méxico',
    'congreso méxico',
    'directorio diputados méxico',
    'directorio senadores méxico',
    'impuesto saludable videojuegos',
    'no al impuesto gaming',
    'gaming méxico',
    'videojuegos méxico',
    'comunidad gaming méxico',
    'LXVI legislatura',
    'LXV legislatura'
  ],
  authors: [{ name: 'Comunidad Gaming México' }],
  creator: 'Comunidad Gaming México',
  publisher: 'Comunidad Gaming México',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: siteName,
    title: 'NO al Impuesto a Videojuegos México 2026 | #elgamingsalva',
    description: '¡NO AL IMPUESTO DEL 8% A VIDEOJUEGOS! Encuentra y contacta a tus Diputados y Senadores. Haz que tu voz sea escuchada contra el impuesto a videojuegos en México.',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'NO al Impuesto a Videojuegos México - #elgamingsalva',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'NO al Impuesto a Videojuegos México 2026 | #elgamingsalva',
    description: '¡NO AL IMPUESTO DEL 8% A VIDEOJUEGOS! Encuentra y contacta a tus Diputados y Senadores del Congreso de México.',
    images: [`${siteUrl}/opengraph-image`],
    creator: '@elgamingsalva',
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  // Verification tags (opcional - agrega tus IDs cuando los tengas)
  // verification: {
  //   google: 'tu-google-verification-id',
  //   yandex: 'tu-yandex-verification-id',
  // },
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: 'es-MX',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/diputados?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Comunidad Gaming México',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon`,
          width: 512,
          height: 512,
        },
        sameAs: [
          'https://twitter.com/elgamingsalva',
          // Agrega más redes sociales cuando las tengas
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Diputados',
            item: `${siteUrl}/diputados`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Senadores',
            item: `${siteUrl}/senadores`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="es-MX">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Data Fast Analytics */}
        <Script
          defer
          data-website-id="dfid_uSwvXmiwx2aExJlAqrAmu"
          data-domain="www.quienmerepresenta.mx"
          data-allow-localhost="true"
          src="https://datafa.st/js/script.js"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
