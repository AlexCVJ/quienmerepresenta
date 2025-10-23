export const metadata = {
  title: 'Directorio de Senadores de México | Contacta contra el Impuesto a Videojuegos',
  description: 'Directorio completo de los Senadores de la LXV Legislatura del Congreso de México. Filtra por partido político y estado. Contacta a tu senador contra el impuesto del 8% a videojuegos. #elgamingsalva',
  keywords: [
    'senadores méxico',
    'directorio senadores',
    'contactar senadores',
    'LXV legislatura',
    'senado méxico',
    'impuesto videojuegos',
    'senadores por estado',
    'senadores por partido',
    'cámara de senadores méxico',
  ],
  openGraph: {
    title: 'Directorio de Senadores de México | NO al Impuesto a Videojuegos',
    description: 'Encuentra y contacta a los Senadores de México. Filtra por partido político y estado. Haz que tu voz sea escuchada contra el impuesto a videojuegos.',
    url: 'https://quienmerepresenta.mx/senadores',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directorio de Senadores de México | #elgamingsalva',
    description: 'Encuentra y contacta a los Senadores de México contra el impuesto a videojuegos.',
  },
  alternates: {
    canonical: 'https://quienmerepresenta.mx/senadores',
  },
};

export default function SenadoresLayout({ children }) {
  return <>{children}</>;
}
