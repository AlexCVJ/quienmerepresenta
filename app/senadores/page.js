'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SenadoresPage() {
  const [senadores, setSenadores] = useState([]);
  const [filteredSenadores, setFilteredSenadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para filtros
  const [selectedPartidos, setSelectedPartidos] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
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
    const urlJsonLocal = '/data/directorioSenadores.json';

    fetch(urlJsonLocal)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((senadoresData) => {
        console.log('¡Éxito! JSON cargado:', senadoresData.length, 'senadores');
        setSenadores(senadoresData);
        setFilteredSenadores(senadoresData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar JSON:', err);
        setError(`No se pudo cargar el archivo ${urlJsonLocal}.`);
        setLoading(false);
      });
  }, []);

  // Obtener listas únicas para filtros
  const estadosUnicos = [...new Set(senadores.map(s => s.estado))].filter(Boolean).sort();
  const partidosUnicos = [...new Set(senadores.map(s => s.partido))].filter(Boolean).sort();

  // Manejar búsqueda y filtros
  useEffect(() => {
    let filtrados = [...senadores];

    // Filtro por búsqueda
    if (searchTerm.trim()) {
      const busquedaNormalizada = normalizarTexto(searchTerm);
      filtrados = filtrados.filter((sen) => {
        const nombreNorm = normalizarTexto(sen.nombre);
        const estadoNorm = normalizarTexto(sen.estado);
        const partidoNorm = normalizarTexto(sen.partido);
        const correoNorm = normalizarTexto(sen.correo);
        const extensionNorm = normalizarTexto(sen.extension);

        return (
          nombreNorm.includes(busquedaNormalizada) ||
          estadoNorm.includes(busquedaNormalizada) ||
          partidoNorm.includes(busquedaNormalizada) ||
          correoNorm.includes(busquedaNormalizada) ||
          extensionNorm.includes(busquedaNormalizada)
        );
      });
    }

    // Filtro por partidos
    if (selectedPartidos.length > 0) {
      filtrados = filtrados.filter(sen =>
        selectedPartidos.includes(sen.partido)
      );
    }

    // Filtro por estado
    if (selectedEstado) {
      filtrados = filtrados.filter(sen => sen.estado === selectedEstado);
    }

    setFilteredSenadores(filtrados);
  }, [searchTerm, senadores, selectedPartidos, selectedEstado]);

  // Funciones para manejar filtros
  const togglePartido = (partido) => {
    setSelectedPartidos(prev =>
      prev.includes(partido)
        ? prev.filter(p => p !== partido)
        : [...prev, partido]
    );
  };

  const limpiarFiltros = () => {
    setSelectedPartidos([]);
    setSelectedEstado('');
    setSearchTerm('');
  };

  const totalFiltrosActivos = selectedPartidos.length +
    (selectedEstado ? 1 : 0);

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
          position: relative;
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
        .home-btn {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .home-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
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
        .senador-card {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 1.5rem;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .senador-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        .senador-card h3 {
          margin-top: 0;
          color: #0056b3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .senador-card p {
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
        .party-tag.pan { background-color: #0033a0; color: white; }
        .party-tag.pri {
          background: linear-gradient(to right, #006847 33%, #ffffff 33%, #ffffff 66%, #ce1126 66%);
          color: #000;
        }
        .party-tag.prd { background-color: #ffd400; color: #333; }
        .party-tag.pvem,
        .party-tag.verde { background-color: #54a53b; color: white; }
        .party-tag.pt {
          background: linear-gradient(135deg, #da251d 50%, #ffd700 50%);
          color: white;
        }
        .party-tag.mc,
        .party-tag.movimiento-ciudadano { background-color: #ff8000; color: white; }
        .party-tag.morena { background-color: #a0204c; color: white; }
        .party-tag.sg,
        .party-tag.default { background-color: #6c757d; }

        .phone-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0056b3;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: #e3f2fd;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
          font-weight: 600;
        }
        .phone-link:hover {
          background: #bbdefb;
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .phone-icon {
          font-size: 1.2rem;
        }

        .error {
          color: #f44336;
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          margin: 2rem;
        }
        .loading {
          text-align: center;
          padding: 2rem;
          color: #666;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .header h1 {
            font-size: 1.5rem;
          }
          .content-wrapper {
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: ${sidebarOpen ? '0' : '-100%'};
            width: 100%;
            max-width: 320px;
            height: 100vh;
            max-height: 100vh;
            z-index: 999;
            transition: left 0.3s ease;
            border-radius: 0;
          }
          .sidebar-overlay {
            display: ${sidebarOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 998;
          }
          .mobile-filter-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .directorio-container {
            grid-template-columns: 1fr;
          }
          .search-results-header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 1.5rem 1rem;
          }
          .header h1 {
            font-size: 1.25rem;
          }
          .senador-card {
            padding: 1rem;
          }
          .senador-card h3 {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="header">
          <Link href="/" className="home-btn">
            <span>←</span>
            <span>Inicio</span>
          </Link>
          <h1>Directorio de Senadores de México</h1>
          <p className="subtitle">Encuentra y contacta a tus representantes</p>
        </div>

        {/* Overlay para mobile */}
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Botón flotante para filtros en mobile */}
        <button
          className="mobile-filter-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Abrir filtros"
        >
          🔍
        </button>

        <div className="content-wrapper">
          {/* Sidebar con filtros */}
          <aside className="sidebar">
            <h3>
              Filtros
              {totalFiltrosActivos > 0 && (
                <span className="filter-badge">{totalFiltrosActivos}</span>
              )}
            </h3>

            {/* Filtro por partido */}
            <div className="filter-section">
              <h4>Partido Político</h4>
              {partidosUnicos.map(partido => (
                <div key={partido} className="filter-checkbox">
                  <input
                    type="checkbox"
                    id={`partido-${partido}`}
                    checked={selectedPartidos.includes(partido)}
                    onChange={() => togglePartido(partido)}
                  />
                  <label htmlFor={`partido-${partido}`}>
                    <span className={`party-tag ${partido.toLowerCase().replace(/\s+/g, '-')}`}>
                      {partido}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {/* Filtro por estado */}
            <div className="filter-section">
              <h4>Estado</h4>
              <select
                className="filter-select"
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                {estadosUnicos.map(estado => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón limpiar filtros */}
            <button
              className="clear-filters-btn"
              onClick={limpiarFiltros}
              disabled={totalFiltrosActivos === 0 && !searchTerm}
            >
              Limpiar filtros
            </button>
          </aside>

          {/* Contenido principal */}
          <main className="main-content">
            {loading && <div className="loading">Cargando directorio de senadores...</div>}
            {error && <div className="error"><strong>Error Crítico:</strong> {error}</div>}

            {!loading && !error && (
              <>
                <div className="search-results-header">
                  <div className="results-count">
                    {filteredSenadores.length} {filteredSenadores.length === 1 ? 'senador encontrado' : 'senadores encontrados'}
                  </div>
                  <input
                    type="text"
                    className="buscador"
                    placeholder="Buscar por nombre, partido, estado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="directorio-container">
                  {filteredSenadores.map((sen, index) => {
                    if (!sen || !sen.nombre) return null;

                    const estado = sen.estado || 'N/A';
                    const partido = sen.partido || 'S/P';
                    const correo = sen.correo || 'N/A';
                    const telefono = sen.telefono || 'N/A';
                    const extension = sen.extension || 'N/A';

                    // Crear enlace tel: con el formato correcto
                    const telefonoClean = telefono.replace(/[^0-9]/g, '');
                    const telLink = telefonoClean ? `tel:+52${telefonoClean}` : null;

                    return (
                      <div key={`${sen.numero || index}-${sen.nombre}`} className="senador-card">
                        <h3>
                          {sen.nombre}
                          <span className={`party-tag ${partido.toLowerCase().replace(/\s+/g, '-')}`}>
                            {partido}
                          </span>
                        </h3>
                        <p>
                          <strong>Estado:</strong> {estado}
                        </p>
                        <p>
                          <strong>Email:</strong> {correo}
                        </p>
                        <p>
                          <strong>Teléfono:</strong> {telefono}
                        </p>
                        <p>
                          <strong>Extensión:</strong> {extension}
                        </p>

                        {/* Botón de llamada */}
                        {telLink && (
                          <a href={telLink} className="phone-link">
                            <span className="phone-icon">📞</span>
                            <span>Llamar ahora</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
