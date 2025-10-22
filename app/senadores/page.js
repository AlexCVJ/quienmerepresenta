'use client';

import { useState, useEffect } from 'react';

export default function SenadoresPage() {
  const [senadores, setSenadores] = useState([]);
  const [filteredSenadores, setFilteredSenadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coloresPartidos = {
    'MORENA': '#a02c2c',
    'PAN': '#0033a0',
    'PRI': '#006642',
    'MC': '#ff7f00',
    'PVEM': '#84c44c',
    'PT': '#d40000',
    'PRD': '#ffde00',
    'PES': '#663399',
    'SGP': '#808080'
  };

  // Cargar XML al montar el componente
  useEffect(() => {
    const urlXmlLocal = '/data/directorioSenadores.xml';

    fetch(urlXmlLocal)
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.text();
      })
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');

        console.log('Documento XML parseado:', xmlDoc);

        const senadoresNodes = xmlDoc.getElementsByTagName('datos');
        console.log('Total de senadores encontrados en el XML:', senadoresNodes.length);

        const getText = (node, tagName) =>
          node.getElementsByTagName(tagName)[0]?.textContent || 'No disponible';

        const senadoresData = [];
        for (let node of senadoresNodes) {
          senadoresData.push({
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

        setSenadores(senadoresData);
        setFilteredSenadores(senadoresData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar el archivo XML local:', error);
        setError('No se pudo cargar el archivo XML local. Asegúrate de que el archivo se llame directorioSenadores.xml y esté en /data/');
        setLoading(false);
      });
  }, []);

  // Manejar búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSenadores(senadores);
      return;
    }

    const query = searchTerm.toLowerCase().trim();
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

    setFilteredSenadores(resultadosFiltrados);
  }, [searchTerm, senadores]);

  return (
    <>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        header {
          text-align: center;
          padding: 40px 20px;
          color: white;
        }

        header h1 {
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        header p {
          font-size: 1.1rem;
          margin: 0;
          opacity: 0.9;
        }

        .search-box {
          margin: 30px 0;
        }

        .search-box input {
          width: 100%;
          padding: 15px 20px;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        .search-box input:focus {
          outline: none;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .result-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .result-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .result-card h3 {
          margin: 0 0 15px 0;
          font-size: 1.3rem;
          color: #2c3e50;
        }

        .partido-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .partido-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .result-card p {
          margin: 8px 0;
          color: #555;
          line-height: 1.6;
        }

        .result-card strong {
          color: #2c3e50;
        }

        .error {
          color: white;
          background: rgba(255, 0, 0, 0.8);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        .loading {
          color: white;
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
        }

        .no-results {
          color: white;
          text-align: center;
          padding: 40px;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="container">
        <header>
          <h1>Directorio de Senadores de México</h1>
          <p>Busca información detallada por nombre, partido, estado, comisión y más.</p>
        </header>

        <main>
          <div className="search-box">
            <input
              type="text"
              placeholder="Escribe un nombre, partido, estado, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
          </div>

          {loading && <div className="loading">Cargando directorio de senadores...</div>}
          {error && <div className="error"><strong>Error:</strong> {error}</div>}

          <div className="results-grid">
            {!loading && !error && filteredSenadores.length === 0 && (
              <div className="no-results">No se encontraron senadores que coincidan con tu búsqueda.</div>
            )}

            {!loading && !error && filteredSenadores.map((senador, index) => {
              const colorFondo = coloresPartidos[senador.partido] || '#6c757d';
              const colorTexto = senador.partido === 'PRD' ? '#000000' : '#FFFFFF';

              return (
                <div key={`${index}-${senador.nombre}`} className="result-card">
                  <h3>{senador.nombre}</h3>
                  <div className="partido-info">
                    <span
                      className="partido-badge"
                      style={{ backgroundColor: colorFondo, color: colorTexto }}
                    >
                      {senador.partido}
                    </span>
                    <strong>{senador.entidad}</strong>
                  </div>
                  <p>
                    <strong>Email:</strong> {senador.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {senador.telefono}
                  </p>
                  <p>
                    <strong>Extensión:</strong> {senador.extension}
                  </p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
