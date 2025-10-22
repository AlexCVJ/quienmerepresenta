document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.getElementById('busqueda');
  const divResultados = document.getElementById('resultados');
  
  const urlXmlLocal = 'directorioSenadores.xml'; 

  let senadores = []; 
  let datosCargados = false;

  const coloresPartidos = {
    'MORENA': '#a02c2c', 'PAN': '#0033a0', 'PRI': '#006642',
    'MC': '#ff7f00', 'PVEM': '#84c44c', 'PT': '#d40000',
    'PRD': '#ffde00', 'PES': '#663399', 'SGP': '#808080'
  };

  divResultados.innerHTML = '<p>Cargando directorio de senadores...</p>';
  inputBusqueda.disabled = true; 

  fetch(urlXmlLocal) 
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return response.text();
    })
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");

      // ======================================================
      // ===       DEPURACION    ===
      // ======================================================
      
      // --- LÍNEA DE DEPURACIÓN 1 ---
      // Revisa en la consola (F12) si esto muestra un documento XML o un error.
      console.log('Documento XML parseado:', xmlDoc); 

      const senadoresNodes = xmlDoc.getElementsByTagName('datos');
      
      // --- LÍNEA DE DEPURACIÓN 2 ---
      // Esto nos dirá cuántas etiquetas <senador> encontró. Debería ser > 100.
      console.log('Total de senadores encontrados en el XML:', senadoresNodes.length); 

      // ======================================================
      // ===            FIN DE LAS LÍNEAS DE DEPURACIÓN     ===
      // ======================================================
      
      const getText = (node, tagName) => node.getElementsByTagName(tagName)[0]?.textContent || 'No disponible';

      for (let node of senadoresNodes) {
        senadores.push({
          nombre: getText(node, 'nombre'),
          partido: getText(node, 'fraccion'),
          entidad: getText(node, 'estado'),
          tipoEleccion: getText(node, 'tipoEleccion'),
          rolComision: getText(node, 'rolComision'),
          email: getText(node, 'correo'),
        telefono: getText(node, 'telefono'),
        extension: getText(node, 'extencion'),
          suplente: getText(node, 'suplente')
        });
      }
      
      datosCargados = true; 
      inputBusqueda.disabled = false;
      mostrarResultados(senadores); 
    })
    .catch(error => {
      console.error('Error al cargar el archivo XML local:', error);
      divResultados.innerHTML = `<p style="color: red;"><strong>Error: No se pudo cargar el archivo XML local.</strong><br>Asegúrate de que el archivo se llame <code>directorioSenadores.xml</code> y esté en la misma carpeta que <code>index.html</code>.</p>`;
    });

  // ... (El resto del archivo 'mostrarResultados' y 'inputBusqueda' 
  //      permanece exactamente igual que antes) ...

  function mostrarResultados(resultados) {
    divResultados.innerHTML = '';
    
    if (resultados.length === 0) {
      if (datosCargados) {
        divResultados.innerHTML = '<p>No se encontraron senadores que coincidan con tu búsqueda.</p>';
      }
      return;
    }

    resultados.forEach(senador => {
      const colorFondo = coloresPartidos[senador.partido] || '#6c757d';
      const colorTexto = senador.partido === 'PRD' ? '#000000' : '#FFFFFF';
      const cardHTML = `
        <div class="result-card">
          <h3>${senador.nombre}</h3>
          <div class="partido-info">
             <span class="partido-badge" style="background-color: ${colorFondo}; color: ${colorTexto};">${senador.partido}</span>
             <strong>${senador.entidad}</strong>
          </div>
          <p><strong>Email:</strong> ${senador.email}</p>
          <p><strong>Teléfono:</strong> ${senador.telefono}</p>
        <p><strong>Extensión:</strong> ${senador.extension}</p>
        </div>
      `;
      divResultados.innerHTML += cardHTML;
    });
  }

  inputBusqueda.addEventListener('input', (e) => {
    if (!datosCargados) return; 

    const query = e.target.value.toLowerCase().trim();
    const resultadosFiltrados = senadores.filter(senador => {
      return (
        senador.nombre.toLowerCase().includes(query) ||
        senador.partido.toLowerCase().includes(query) ||
        senador.entidad.toLowerCase().includes(query) ||
        senador.tipoEleccion.toLowerCase().includes(query) ||
        senador.rolComision.toLowerCase().includes(query) ||
        senador.email.toLowerCase().includes(query) ||
        senador.suplente.toLowerCase().includes(query)
      );
    });
    mostrarResultados(resultadosFiltrados);
  });
});