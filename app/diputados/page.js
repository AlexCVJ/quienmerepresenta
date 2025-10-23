'use client';

import { useState, useEffect } from 'react';

export default function DiputadosPage() {
  const [diputados, setDiputados] = useState([]);
  const [filteredDiputados, setFilteredDiputados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para filtros
  const [selectedPartidos, setSelectedPartidos] = useState([]);
  const [selectedEntidad, setSelectedEntidad] = useState('');
  const [selectedTipoEleccion, setSelectedTipoEleccion] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función de ayuda para normalizar texto (sin acentos)
  const normalizarTexto = (texto) => {
    if (!texto) return '';
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Cargar JSON al montar el componente
  useEffect(() => {
    const RUTA_JSON = '/data/diputados.json';

    fetch(RUTA_JSON)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDiputados(data.diputados);
        setFilteredDiputados(data.diputados);
        setLoading(false);
        console.log('¡Éxito! JSON cargado:', data.diputados.length, 'diputados');
        console.log('Metadata:', data.metadata);
      })
      .catch((err) => {
        console.error('Error al cargar JSON:', err);
        setError(`No se pudo cargar el archivo ${RUTA_JSON}.`);
        setLoading(false);
      });
  }, []);

  // Obtener listas únicas para filtros
  const entidadesUnicas = [...new Set(diputados.map(d => d.entidad))].filter(Boolean).sort();
  const partidosUnicos = [...new Set(diputados.map(d => d.partido?.codigo))].filter(Boolean).sort();
  const tiposEleccionUnicos = [...new Set(diputados.map(d => d.tipo_eleccion))].filter(Boolean).sort();

  // Manejar búsqueda y filtros
  useEffect(() => {
    let filtrados = [...diputados];

    // Filtro por búsqueda
    if (searchTerm.trim()) {
      const busquedaNormalizada = normalizarTexto(searchTerm);
      filtrados = filtrados.filter((dip) => {
        const nombreNorm = normalizarTexto(dip.nombre);
        const entidadNorm = normalizarTexto(dip.entidad);
        const distritoNorm = normalizarTexto(dip.distrito);
        const partidoNorm = normalizarTexto(dip.partido?.codigo);
        const emailNorm = normalizarTexto(dip.email);
        const circuitoNorm = normalizarTexto(dip.circuito);

        return (
          nombreNorm.includes(busquedaNormalizada) ||
          entidadNorm.includes(busquedaNormalizada) ||
          distritoNorm.includes(busquedaNormalizada) ||
          partidoNorm.includes(busquedaNormalizada) ||
          emailNorm.includes(busquedaNormalizada) ||
          circuitoNorm.includes(busquedaNormalizada)
        );
      });
    }

    // Filtro por partidos
    if (selectedPartidos.length > 0) {
      filtrados = filtrados.filter(dip =>
        selectedPartidos.includes(dip.partido?.codigo)
      );
    }

    // Filtro por entidad
    if (selectedEntidad) {
      filtrados = filtrados.filter(dip => dip.entidad === selectedEntidad);
    }

    // Filtro por tipo de elección
    if (selectedTipoEleccion.length > 0) {
      filtrados = filtrados.filter(dip =>
        selectedTipoEleccion.includes(dip.tipo_eleccion)
      );
    }

    setFilteredDiputados(filtrados);
  }, [searchTerm, diputados, selectedPartidos, selectedEntidad, selectedTipoEleccion]);

  // Funciones para manejar filtros
  const togglePartido = (partido) => {
    setSelectedPartidos(prev =>
      prev.includes(partido)
        ? prev.filter(p => p !== partido)
        : [...prev, partido]
    );
  };

  const toggleTipoEleccion = (tipo) => {
    setSelectedTipoEleccion(prev =>
      prev.includes(tipo)
        ? prev.filter(t => t !== tipo)
        : [...prev, tipo]
    );
  };

  const limpiarFiltros = () => {
    setSelectedPartidos([]);
    setSelectedEntidad('');
    setSelectedTipoEleccion([]);
    setSearchTerm('');
  };

  const totalFiltrosActivos = selectedPartidos.length +
    (selectedEntidad ? 1 : 0) +
    selectedTipoEleccion.length;

  return (
    <>
      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        .page-wrapper {
          min-height: 100vh;
          background-color: #f4f7f6;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header h1 {
          margin: 0;
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
        }
        .header .subtitle {
          text-align: center;
          opacity: 0.9;
          margin-top: 0.5rem;
          font-size: 0.95rem;
        }
        .mobile-filter-btn {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 1000;
          transition: transform 0.2s;
        }
        .mobile-filter-btn:hover {
          transform: scale(1.1);
        }
        .content-wrapper {
          display: flex;
          max-width: 1600px;
          margin: 0 auto;
          gap: 2rem;
          padding: 2rem 1rem;
        }
        .sidebar {
          width: 300px;
          flex-shrink: 0;
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          align-self: flex-start;
          position: sticky;
          top: 20px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }
        .sidebar h3 {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .filter-badge {
          background: #667eea;
          color: white;
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 0.75rem;
          font-weight: bold;
        }
        .filter-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e0e0e0;
        }
        .filter-section:last-child {
          border-bottom: none;
        }
        .filter-section h4 {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 0.75rem 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-checkbox {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .filter-checkbox:hover {
          background: #f5f5f5;
        }
        .filter-checkbox input {
          margin-right: 0.5rem;
          cursor: pointer;
        }
        .filter-checkbox label {
          cursor: pointer;
          font-size: 0.9rem;
          flex: 1;
        }
        .filter-select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
        }
        .clear-filters-btn {
          width: 100%;
          padding: 0.75rem;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .clear-filters-btn:hover {
          background: #d32f2f;
        }
        .clear-filters-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .main-content {
          flex: 1;
          min-width: 0;
        }
        .search-results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .results-count {
          font-size: 1.1rem;
          color: #333;
          font-weight: 600;
        }
        .buscador {
          width: 100%;
          font-size: 1rem;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .directorio-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.25rem;
        }
        .diputado-card {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 1.5rem;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .diputado-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        .diputado-card h3 {
          margin-top: 0;
          color: #0056b3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .diputado-card p {
          margin: 8px 0;
          line-height: 1.6;
          word-break: break-word;
          font-size: 0.95rem;
        }
        .party-tag {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: bold;
          color: white;
          text-transform: uppercase;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .party-tag.pan { background-color: #004a99; }
        .party-tag.pri { background-color: #e4002b; }
        .party-tag.prd { background-color: #ffd400; color: #333; }
        .party-tag.pvem { background-color: #4c9c2e; }
        .party-tag.pt { background-color: #c70000; }
        .party-tag.mc { background-color: #ff8000; }
        .party-tag.morena { background-color: #800000; }
        .party-tag.default,
        .party-tag.sp { background-color: #6c757d; }

        .diputado-foto {
          width: 120px;
          height: 120px;
          margin: 0 auto 15px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #ddd;
          background-color: #f0f0f0;
        }
        .diputado-foto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tipo-eleccion {
          font-size: 0.9rem;
          color: #666;
          font-style: italic;
          margin-top: -5px !important;
        }

        .comisiones-section {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        .comisiones-section strong {
          color: #555;
          font-size: 0.9rem;
        }
        .comisiones-list {
          margin: 8px 0;
          padding-left: 20px;
          font-size: 0.85rem;
          color: #666;
          max-height: 150px;
          overflow-y: auto;
        }
        .comisiones-list li {
          margin: 4px 0;
          line-height: 1.4;
        }
        .comisiones-list em {
          color: #0056b3;
          font-style: normal;
          font-weight: 600;
        }

        .error {
          color: red;
          text-align: center;
          padding: 20px;
        }
        .loading {
          text-align: center;
          padding: 20px;
          color: #666;
        }
      `}</style>

      <h1>Directorio de Diputados LXVI</h1>

      <input
        type="text"
        className="buscador"
        placeholder="Buscar por nombre, partido, entidad o distrito..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={loading}
      />

      {loading && <div className="loading">Cargando directorio de diputados...</div>}
      {error && <div className="error"><strong>Error Crítico:</strong> {error}</div>}

      <div className="directorio-container">
        {!loading && !error && filteredDiputados.map((dip, index) => {
          if (!dip || !dip.nombre) return null;

          const entidad = dip.entidad || 'N/A';
          const distrito = dip.distrito || 'N/A';
          const circuito = dip.circuito || 'N/A';
          const email = dip.email || 'N/A';
          const extension = dip.extension || 'N/A';
          const suplente = dip.suplente || 'N/A';
          const fechaNacimiento = dip.fecha_nacimiento || null;
          const tipoEleccion = dip.tipo_eleccion || null;
          const fotoUrl = dip.foto_url || null;
          const comisiones = dip.comisiones || [];

          const partidoCodigo = dip.partido?.codigo || 'default';
          let partidoNombre = dip.partido?.codigo || 'S/P';
          if (partidoNombre === 'default' || partidoNombre === 'sp') partidoNombre = 'S/P';

          return (
            <div key={`${dip.id || index}-${dip.nombre}`} className="diputado-card">
              {fotoUrl && (
                <div className="diputado-foto">
                  <img
                    src={fotoUrl}
                    alt={`Foto de ${dip.nombre}`}
                    loading="lazy"
                  />
                </div>
              )}
              <h3>
                {dip.nombre}
                <span className={`party-tag ${partidoCodigo.toLowerCase()}`}>
                  {partidoNombre.toUpperCase()}
                </span>
              </h3>
              {tipoEleccion && (
                <p className="tipo-eleccion">
                  <strong>Tipo:</strong> {tipoEleccion}
                </p>
              )}
              <p>
                <strong>Entidad:</strong> {entidad} | <strong>Distrito:</strong> {distrito}
              </p>
              <p>
                <strong>Circuito:</strong> {circuito}
              </p>
              {fechaNacimiento && (
                <p>
                  <strong>Fecha de nacimiento:</strong> {fechaNacimiento}
                </p>
              )}
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Teléfono:</strong> 55 5036 0000 | <strong>Ext:</strong> {extension}
              </p>
              {suplente !== 'N/A' && (
                <p>
                  <strong>Suplente:</strong> {suplente}
                </p>
              )}
              {comisiones.length > 0 && (
                <div className="comisiones-section">
                  <strong>Comisiones ({comisiones.length}):</strong>
                  <ul className="comisiones-list">
                    {comisiones.map((com, idx) => (
                      <li key={idx}>
                        {com.nombre} {com.cargo && <em>({com.cargo})</em>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
