document.addEventListener("DOMContentLoaded", () => {
    
    // --- INICIO: Función de ayuda ---
    function normalizarTexto(texto) {
        if (!texto) return ""; 
        return texto
            .toLowerCase()
            .normalize("NFD") 
            .replace(/[\u0300-\u036f]/g, ""); 
    }
    // --- FIN: Función de ayuda ---

    
    // --- ¡ACTUALIZADO! ---
    // El nombre de archivo coincide con el NUEVO CSV que acabas de generar
    const RUTA_CSV = "directorio_diputados_final.csv"; 
    
    const container = document.getElementById("directorio-container");
    const buscador = document.getElementById("buscador");
    let todosLosDiputados = []; 

    // 1. Usamos PapaParse
    Papa.parse(RUTA_CSV, {
        download: true,
        header: true,
        skipEmptyLines: true,
        encoding: "UTF-8", // Correcto para leer el CSV nuevo
        complete: (results) => {
            todosLosDiputados = results.data;
            mostrarDiputados(todosLosDiputados);
            console.log("¡Éxito! CSV cargado:", todosLosDiputados.length, "diputados");
        },
        error: (err) => {
            console.error("Error al cargar o procesar el CSV:", err);
            container.innerHTML = `<p style="color: red;"><b>Error Crítico:</b> No se pudo cargar el archivo <code>${RUTA_CSV}</code>.</p>`;
        }
    });

    /**
     * Función para dibujar las tarjetas de los diputados en la página
     */
    function mostrarDiputados(lista) {
        container.innerHTML = ""; 
        
        for (const dip of lista) {
            if (dip && dip.nombre) {
                const card = document.createElement("div");
                card.className = "diputado-card";

                // --- ¡ACTUALIZADO! ---
                // Leemos todos los campos del nuevo CSV
                const entidad = dip.entidad || 'N/A';
                const distrito = dip.distrito || 'N/A';
                const email = dip.email || 'N/A';
                const extension = dip.extension || 'N/A';
                
                // Lógica para el partido
                const partido = dip.partido || 'default'; // 'default' para el color gris
                let partidoNombre = dip.partido || 'S/P'; // 'S/P' (Sin Partido) si no se encuentra
                if (partidoNombre === 'default' || partidoNombre === 'sp') partidoNombre = 'S/P';
                
                // Creamos la etiqueta del partido
                const etiquetaPartido = `<span class="party-tag ${partido.toLowerCase()}">${partidoNombre.toUpperCase()}</span>`;

                // Mostramos todos los campos
                card.innerHTML = `
                    <h3>
                        ${dip.nombre}
                        ${etiquetaPartido}
                    </h3>
                    <p><strong>Entidad:</strong> ${entidad}</p>
                    <p><strong>Distrito:</strong> ${distrito}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Teléfono:</strong> 55 5036 0000 | <strong>Ext:</strong> ${extension}</p> 
                `; 
                container.appendChild(card);
            }
        }
    }

    /**
     * Evento para el buscador (ignora acentos)
     */
    buscador.addEventListener("keyup", (e) => {
        const busquedaNormalizada = normalizarTexto(e.target.value);
        
        const filtrados = todosLosDiputados.filter((dip) => {
            // Normalizamos todos los campos de búsqueda
            const nombreNorm = normalizarTexto(dip.nombre);
            const entidadNorm = normalizarTexto(dip.entidad);
            const distritoNorm = normalizarTexto(dip.distrito);
            const partidoNorm = normalizarTexto(dip.partido); // <-- ¡NUEVO!

            // --- ¡ACTUALIZADO! ---
            // Añadimos el partido a la búsqueda
            return (nombreNorm.includes(busquedaNormalizada)) ||
                   (entidadNorm.includes(busquedaNormalizada)) ||
                   (distritoNorm.includes(busquedaNormalizada)) ||
                   (partidoNorm.includes(busquedaNormalizada)); // <-- ¡NUEVO!
        });
        
        mostrarDiputados(filtrados);
    });
});