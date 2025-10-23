export const metadata = {
  title: 'Directorio de Diputados de México | Contacta contra el Impuesto a Videojuegos',
  description: 'Directorio completo de los 500 Diputados de la LXVI Legislatura del Congreso de México. Filtra por partido, entidad y distrito. Contacta a tu diputado contra el impuesto del 8% a videojuegos. #elgamingsalva',
  keywords: [
    'diputados méxico',
    'directorio diputados',
    'contactar diputados',
    'LXVI legislatura',
    'congreso méxico',
    'impuesto videojuegos',
    'diputados por estado',
    'diputados por partido',
    'cámara de diputados méxico',
  ],
  openGraph: {
    title: 'Directorio de Diputados de México | NO al Impuesto a Videojuegos',
    description: 'Encuentra y contacta a los 500 Diputados de México. Filtra por partido político, entidad federativa y distrito. Haz que tu voz sea escuchada contra el impuesto a videojuegos.',
    url: 'https://quienmerepresenta.mx/diputados',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directorio de Diputados de México | #elgamingsalva',
    description: 'Encuentra y contacta a los 500 Diputados de México contra el impuesto a videojuegos.',
  },
  alternates: {
    canonical: 'https://quienmerepresenta.mx/diputados',
  },
};

export default function DiputadosLayout({ children }) {
  return <>{children}</>;
}
