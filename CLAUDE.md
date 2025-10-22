# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Quién Me Representa** is a civic engagement Next.js application providing searchable directories of Mexican Congress members (Deputies and Senators) to help citizens contact their representatives. The project was created in response to a proposed 8% tax on video games in Mexico (#elgamingsalva movement).

## Architecture

### Technology Stack

**Framework:**
- Next.js 14+ with App Router
- React 18+ (JavaScript, not TypeScript)
- Server Components + Client Components (hybrid rendering)

**Data Management:**
- CSV parsing: PapaParse library (diputados)
- XML parsing: Native DOMParser API (senadores)
- Static data files in `public/data/`

**Deployment:**
- Vercel (optimized with standalone output)
- Static data served from CDN

### Directory Structure

```
quienmerepresenta/
├── app/
│   ├── layout.js           # Root layout with Roboto font, metadata
│   ├── page.js             # Landing page (campaign info, navigation)
│   ├── diputados/
│   │   └── page.js         # Deputies directory (Client Component)
│   └── senadores/
│       └── page.js         # Senators directory (Client Component)
├── public/
│   └── data/
│       ├── directorio_diputados_final.csv  # 500 deputy profiles
│       └── directorioSenadores.xml         # Senator profiles
├── scripts/
│   └── scrapers/
│       ├── diputados/
│       │   ├── Scrapper_Diputados_Final.py
│       │   └── scrapper_Diputados.py
│       ├── senadores/
│       │   └── scrapper_Diputados.py
│       └── README.md       # Scraper usage instructions
├── package.json
├── next.config.js
└── .gitignore
```

### Component Architecture

**app/layout.js (Server Component):**
- Loads Roboto font from Google Fonts
- Sets metadata for SEO (title, description, Open Graph)
- Wraps all pages with consistent HTML structure

**app/page.js (Server Component):**
- Landing page with campaign information
- Static content about video game tax proposal
- Navigation buttons to /diputados and /senadores using Next.js Link

**app/diputados/page.js (Client Component):**
- Marked with `'use client'` directive
- Uses React hooks: useState (search, data), useEffect (fetch CSV, filter)
- Fetches `/data/directorio_diputados_final.csv` on mount
- PapaParse parses CSV with UTF-8 encoding
- Real-time accent-insensitive search with `normalize("NFD")`
- Grid layout with party-colored badges

**app/senadores/page.js (Client Component):**
- Marked with `'use client'` directive
- Uses React hooks: useState (search, data), useEffect (fetch XML, filter)
- Fetches `/data/directorioSenadores.xml` on mount
- DOMParser parses XML, extracts `<datos>` tags
- Real-time search across all fields (lowercase matching)
- Inline party badge styling with `coloresPartidos` object

### Data Flow

**Diputados (CSV):**
1. User visits `/diputados` → Next.js serves page
2. Client Component mounts → `fetch('/data/directorio_diputados_final.csv')`
3. PapaParse converts CSV → JavaScript array of objects
4. User types in search → `useEffect` filters array by normalized text
5. React re-renders grid with filtered cards

**Senadores (XML):**
1. User visits `/senadores` → Next.js serves page
2. Client Component mounts → `fetch('/data/directorioSenadores.xml')`
3. DOMParser parses XML → JavaScript iterates `<datos>` tags
4. User types in search → `useEffect` filters array by lowercase matching
5. React re-renders grid with filtered cards

### Search Implementation

**Diputados (Accent-Insensitive):**
```javascript
const normalizarTexto = (texto) =>
  texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Searches: nombre, entidad, distrito, partido
```

**Senadores (Case-Insensitive):**
```javascript
const query = searchTerm.toLowerCase().trim();
// Searches: nombre, partido, entidad, tipoEleccion, rolComision, email, suplente
```

### Styling Approach

- **Scoped Styles:** Using `<style jsx>` blocks in each page component
- **Inline Styles:** Party badges use inline `style={{ backgroundColor }}` for dynamic colors
- **No CSS Modules:** All styles kept with components for simplicity
- **Responsive:** CSS Grid with `auto-fill` and `minmax()` for responsive cards

## Development Workflow

### Setup and Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build

# Start production server (after build)
npm start
```

### Updating Data

**Important:** Data files live in `public/data/`. After running scrapers, copy new files there.

**Diputados:**
```bash
cd scripts/scrapers/diputados
pip install requests beautifulsoup4
python Scrapper_Diputados_Final.py
# Generates: directorio_diputados_final.csv (500 profiles)

# Copy to public folder
cp directorio_diputados_final.csv ../../../public/data/
```

**Senadores:**
```bash
cd scripts/scrapers/senadores
pip install requests beautifulsoup4
python scrapper_Diputados.py
# Generates: directorioSenadores.xml

# Copy to public folder
cp directorioSenadores.xml ../../../public/data/
```

**After updating data:**
```bash
npm run build  # Rebuild Next.js app
```

### Scraper Details

**Source URLs:**
- Diputados: `https://sitl.diputados.gob.mx/LXVI_leg/curricula.php?dipt={1-500}`
- Senadores: `senado.gob.mx` public XML endpoint

**Key Features:**
- Rate limiting: 0.5s delay between requests
- Error handling: Graceful fallbacks for missing data
- Encoding: ISO-8859-1 → UTF-8 conversion for diputados
- BeautifulSoup selectors for HTML parsing
- DOMParser for XML parsing

**Data Fields:**

*Diputados CSV:*
```
id_diputado, nombre, email, entidad, distrito, extension, partido
```

*Senadores XML tags:*
```
<nombre>, <fraccion>, <estado>, <tipoEleccion>, <rolComision>,
<correo>, <telefono>, <extencion>, <suplente>
```

## Common Tasks

### Add New Political Party

**Diputados (app/diputados/page.js):**
1. Locate the `<style jsx>` block
2. Add new CSS class after line with `.party-tag.morena`
3. Format: `.party-tag.{lowercase-code} { background-color: #hex; }`

**Senadores (app/senadores/page.js):**
1. Locate `coloresPartidos` object at top of component
2. Add entry: `'PARTY_NAME': '#hexcolor'`

### Modify Search Behavior

**Diputados:**
- Edit the `useEffect` filter logic around line 60
- Add new fields to the filter condition:
  ```javascript
  someNewFieldNorm.includes(busquedaNormalizada)
  ```

**Senadores:**
- Edit the `useEffect` filter logic around line 80
- Add new fields to the filter condition:
  ```javascript
  senador.newField.toLowerCase().includes(query)
  ```

### Update Scraper Selectors

If government websites change structure:

**Diputados:** `scripts/scrapers/diputados/Scrapper_Diputados_Final.py`
- Lines 46-97: BeautifulSoup selectors
- nombre (line 48), email (line 55), entidad/distrito (line 62), extension (line 80), partido (line 90)

**Senadores:** `scripts/scrapers/senadores/scrapper_Diputados.py`
- XML tag extraction using `getElementsByTagName()`

### Modify Metadata/SEO

Edit `app/layout.js`:
- `metadata` object contains title, description, Open Graph tags
- Update for better SEO or social sharing

### Change Fonts

Edit `app/layout.js`:
- Import different font from `next/font/google`
- Update weight and subsets as needed

## Deployment to Vercel

### First-Time Setup

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Migrate to Next.js"
   git push origin main
   ```

2. **Import to Vercel:**
   - Visit https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Automatic Deployments:**
   - Every push to `main` triggers new deployment
   - Preview deployments for pull requests

### Manual Deployment

```bash
npm install -g vercel
vercel
```

### Configuration

- `next.config.js` already configured with:
  - `output: 'standalone'` for optimized builds
  - Cache headers for `/data/*` files (1 hour)
  - Package optimization for papaparse

## Project Context

**Campaign Goal:** Enable citizens to contact representatives opposing the video game tax proposal

**Content Language:** Spanish (es)

**License:** GNU GPL v3

**Target Audience:** Mexican citizens, particularly gaming community (#elgamingsalva movement)

**Design Philosophy:**
- Hybrid rendering (SSG + client-side search)
- Minimal dependencies (only Next.js + PapaParse)
- Responsive mobile-first design
- Accessibility through semantic HTML
- Professional styling with party color coding

## Important Notes

- All search/filtering happens **client-side** for instant results
- Data files are **static** and served from CDN (fast global access)
- Python scrapers are **not deployed** (in `scripts/` folder, excluded by Vercel)
- No CORS issues (data served from same origin as Next.js app)
- YouTube video placeholder in `app/page.js` needs actual URL
- Static data means updates require rebuild + redeploy
