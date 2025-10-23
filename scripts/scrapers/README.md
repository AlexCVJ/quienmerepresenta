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

**Opción 1: Convertir XML existente a JSON (recomendado)**

```bash
cd scripts/scrapers/senadores
python xml_to_json_senadores.py
```

Este script lee el XML de `public/data/directorioSenadores.xml` y genera automáticamente `directorioSenadores.json` en la misma carpeta.

**Opción 2: Descargar nuevo XML desde senado.gob.mx**

```bash
cd scripts/scrapers/senadores
python scrapper_Diputados.py
```

Este script generará `directorioSenadores.xml`. Después de ejecutarlo, copia el archivo a `public/data/`:

```bash
cp directorioSenadores.xml ../../../public/data/
```

Luego ejecuta el conversor XML a JSON (Opción 1).

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
    ├── scrapper_Diputados.py        # Scraper de senadores (descarga XML)
    └── xml_to_json_senadores.py     # Conversor XML → JSON
```

## Formatos de Datos

### Senadores (JSON)

El archivo `directorioSenadores.json` contiene un array con 128 senadores:

```json
{
  "numero": 1,
  "nombre": "Heriberto Marcelo Aguilar Castillo",
  "partido": "morena",
  "telefono": "55 5345 3000",
  "extension": "3245 y 3915",
  "correo": "heriberto.aguilar@senado.gob.mx",
  "estado": "Sonora"
}
```

### Diputados (CSV)

El archivo `directorio_diputados_final.csv` contiene 500 diputados con columnas:
- id_diputado, nombre, email, entidad, distrito, extension, partido
