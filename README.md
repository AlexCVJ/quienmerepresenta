# 🇲🇽 Quién Me Representa - Directorio del Congreso de México

Una aplicación Next.js para facilitar el contacto ciudadano con Diputados y Senadores de México.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb)](https://react.dev/)

## 🎯 Sobre el Proyecto

**¡NO AL IMPUESTO A VIDEOJUEGOS!** #elgamingsalva

Este proyecto nace en respuesta a la propuesta de un impuesto del 8% a videojuegos considerados "violentos" para el 2026 en México. Proporcionamos directorios interactivos y buscables de:

- **500 Diputados** de la LXVI Legislatura
- **Senadores** del Senado de la República

Con datos de contacto completos (email, teléfono, extensión) para facilitar que los ciudadanos hagan escuchar su voz ante sus representantes.

## ✨ Características

- 🔍 **Búsqueda en tiempo real** - Filtra por nombre, partido, estado, distrito, etc.
- 🎨 **Interfaz moderna** - Diseño responsivo con identificación visual de partidos políticos
- ⚡ **Rendimiento optimizado** - Búsqueda client-side instantánea
- 🌐 **Sin dependencias pesadas** - Solo Next.js + PapaParse
- 📱 **Mobile-first** - Diseño adaptable a cualquier dispositivo
- ♿ **Accesible** - HTML semántico y navegación por teclado

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/quienmerepresenta.git
cd quienmerepresenta

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### Compilar para producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
quienmerepresenta/
├── app/                    # Next.js App Router
│   ├── layout.js           # Layout raíz (fuentes, metadata)
│   ├── page.js             # Landing page
│   ├── diputados/
│   │   └── page.js         # Directorio de Diputados
│   └── senadores/
│       └── page.js         # Directorio de Senadores
├── public/
│   └── data/               # Archivos CSV y XML
│       ├── directorio_diputados_final.csv
│       └── directorioSenadores.xml
├── scripts/
│   └── scrapers/           # Scripts Python para actualizar datos
└── DirectorioCongreso/     # Archivos HTML originales (legacy)
```

## 🔄 Actualizar Datos

Los scripts de scraping extraen información actualizada de sitios oficiales del gobierno:

### Diputados

```bash
cd scripts/scrapers/diputados
pip install requests beautifulsoup4
python Scrapper_Diputados_Final.py

# Copiar datos a public
cp directorio_diputados_final.csv ../../../public/data/
```

### Senadores

```bash
cd scripts/scrapers/senadores
pip install requests beautifulsoup4
python scrapper_Diputados.py

# Copiar datos a public
cp directorioSenadores.xml ../../../public/data/
```

**Importante:** Después de actualizar los datos, reconstruye la aplicación:

```bash
npm run build
```

## 🚢 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub
2. Visita [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detecta automáticamente la configuración Next.js
5. Click en "Deploy"

### Opción 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Despliegues Automáticos

Cada push a `main` despliega automáticamente a producción. Los pull requests generan previews automáticos.

## 🛠️ Tecnologías

- **[Next.js 14](https://nextjs.org/)** - Framework React con App Router
- **[React 18](https://react.dev/)** - Biblioteca de UI
- **[PapaParse](https://www.papaparse.com/)** - Parser CSV en JavaScript
- **[Python](https://www.python.org/)** - Scripts de scraping (BeautifulSoup4 + Requests)
- **[Vercel](https://vercel.com/)** - Plataforma de despliegue

## 📊 Fuentes de Datos

Los datos provienen de sitios oficiales del gobierno mexicano:

- **Diputados:** [sitl.diputados.gob.mx](https://sitl.diputados.gob.mx)
- **Senadores:** [senado.gob.mx](https://senado.gob.mx)

Los scrapers están configurados con rate limiting (0.5s entre requests) para ser respetuosos con los servidores.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Áreas de Contribución

- Mejorar los selectores de scraping si los sitios cambian
- Añadir tests
- Mejorar accesibilidad
- Traducción a otros idiomas
- Optimización de rendimiento

## 📝 Licencia

Este proyecto está bajo la Licencia GNU General Public License v3.0. Ver [LICENSE](LICENSE) para más detalles.

## 🎮 #elgamingsalva

Este proyecto es parte de la iniciativa **#elgamingsalva** para oponerse al impuesto del 8% a videojuegos en México.

**¿Por qué nos oponemos?**

- Los estudios citados están desactualizados (>15 años)
- No existe correlación científica entre videojuegos y violencia
- Investigaciones recientes muestran beneficios cognitivos y sociales
- Los videojuegos son más que entretenimiento: comunidad, amistad, desarrollo de habilidades

**¿Cómo ayudar?**

1. Usa este directorio para encontrar a tus representantes
2. Envía un correo o llama a su oficina
3. Expresa respetuosamente tu oposición a la medida
4. Comparte esta herramienta con otros

---

**Hecho con ❤️ por la comunidad gaming de México por Alex de CulturaVJ y MagioBus**

Para más información técnica, consulta [CLAUDE.md](CLAUDE.md).

