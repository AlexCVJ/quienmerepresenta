# 🇲🇽 Directorio de Senadores de México

Este es un proyecto de una landing page que consume un XML público del Senado de México (`senado.gob.mx`) y permite a los usuarios buscar senadores en tiempo real.

El proyecto está construido puramente con HTML, CSS y JavaScript (del lado del cliente).

## 🚀 Características

* **Búsqueda en Tiempo Real:** Filtra el directorio mientras el usuario escribe.
* **Búsqueda Global:** La búsqueda funciona por nombre, partido, estado, comisión, email y más.
* **Interfaz Limpia:** Un diseño de tarjetas responsivo para mostrar la información.
* **Estilos Dinámicos:** Las etiquetas de los partidos políticos cambian de color según el partido.

---

## ⚠️ ¡Aviso Importante! Problema de CORS

Este proyecto **no funcionará si se despliega directamente en GitHub Pages** (o cualquier otro hosting estático).

**¿Por qué?**
Por razones de seguridad, los navegadores implementan la **Política de Mismo Origen (CORS)**. El script de esta página (ej. `tu-usuario.github.io`) intenta cargar datos desde un dominio diferente (`senado.gob.mx`). El servidor del Senado no autoriza esta solicitud de "origen cruzado", por lo que el navegador la bloquea.

### Cómo probar este proyecto

Para ver este proyecto en funcionamiento, debes ejecutarlo de una de estas dos maneras:

1.  **Localmente:** Simplemente descarga los archivos (`index.html`, `style.css`, `script.js`) en una carpeta y abre el `index.html` en tu navegador. Esto no funciona en todos los navegadores (Chrome puede bloquearlo), pero suele funcionar en Firefox.
2.  **Usando una extensión de navegador:** La forma más fácil es usar una extensión que deshabilite la política CORS *temporalmente* solo para desarrollo (ej. "CORS Unblock" para Chrome). **Recuerda desactivarla después de probar.**