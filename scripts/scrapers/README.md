# Scripts de Web Scraping

Esta carpeta contiene los scripts de Python para actualizar los datos de Diputados y Senadores.

## Requisitos

```bash
pip install requests beautifulsoup4
```

## Uso

### Actualizar Directorio de Diputados

```bash
cd scripts/scrapers/diputados
python Scrapper_Diputados_Final.py
```

Este script generará `directorio_diputados_final.csv`. Después de ejecutarlo, copia el archivo a `public/data/`:

```bash
cp directorio_diputados_final.csv ../../../public/data/
```

### Actualizar Directorio de Senadores

```bash
cd scripts/scrapers/senadores
python scrapper_Diputados.py
```

Este script generará `directorioSenadores.xml`. Después de ejecutarlo, copia el archivo a `public/data/`:

```bash
cp directorioSenadores.xml ../../../public/data/
```

## Notas Importantes

- Los scrapers extraen datos de sitios oficiales del gobierno (diputados.gob.mx, senado.gob.mx)
- Incluyen rate limiting (0.5s entre requests) para ser respetuosos con los servidores
- Si los selectores HTML cambian en los sitios oficiales, será necesario actualizar los scripts
- Después de actualizar los datos, reconstruye la aplicación Next.js con `npm run build`

## Estructura de Archivos

```
scripts/scrapers/
├── diputados/
│   ├── Scrapper_Diputados_Final.py  # Scraper principal (500 perfiles)
│   └── scrapper_Diputados.py        # Scraper alternativo
└── senadores/
    └── scrapper_Diputados.py        # Scraper de senadores
```
