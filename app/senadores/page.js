'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SenadoresPage() {
  const [senadores, setSenadores] = useState([]);
  const [filteredSenadores, setFilteredSenadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar JSON al montar el componente
  useEffect(() => {
    const urlJsonLocal = '/data/directorioSenadores.json';

    fetch(urlJsonLocal)
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
      })
      .then(senadoresData => {
        console.log('Total de senadores encontrados:', senadoresData.length);
        setSenadores(senadoresData);
        setFilteredSenadores(senadoresData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        setError('No se pudo cargar el directorio de senadores. Por favor, intenta nuevamente más tarde.');
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
        senador.estado.toLowerCase().includes(query) ||
        senador.correo.toLowerCase().includes(query) ||
        senador.extension.toLowerCase().includes(query)
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
          position: relative;
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

        .partido-pan { background-color: #0033a0; color: white; }
        .partido-pri {
          background: linear-gradient(to right, #006847 33%, #ffffff 33%, #ffffff 66%, #ce1126 66%);
          color: #000;
        }
        .partido-prd { background-color: #ffd400; color: #333; }
        .partido-pvem,
        .partido-verde { background-color: #54a53b; color: white; }
        .partido-pt {
          background: linear-gradient(135deg, #da251d 50%, #ffd700 50%);
          color: white;
        }
        .partido-mc { background-color: #ff8000; color: white; }
        .partido-movimiento-ciudadano { background-color: #ff8000; color: white; }
        .partido-morena { background-color: #a0204c; color: white; }
        .partido-sg { background-color: #6c757d; color: white; }
      `}</style>

      <div className="container">
        <header>
          <Link href="/" className="home-btn">
            <span>←</span>
            <span>Inicio</span>
          </Link>
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

            {!loading && !error && filteredSenadores.map((senador) => {
              const partidoClass = `partido-badge partido-${senador.partido.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <div key={senador.numero} className="result-card">
                  <h3>{senador.nombre}</h3>
                  <div className="partido-info">
                    <span className={partidoClass}>
                      {senador.partido}
                    </span>
                    <strong>{senador.estado}</strong>
                  </div>
                  <p>
                    <strong>Email:</strong> {senador.correo}
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
