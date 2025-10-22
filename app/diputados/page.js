'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function DiputadosPage() {
  const [diputados, setDiputados] = useState([]);
  const [filteredDiputados, setFilteredDiputados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función de ayuda para normalizar texto (sin acentos)
  const normalizarTexto = (texto) => {
    if (!texto) return '';
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Cargar CSV al montar el componente
  useEffect(() => {
    const RUTA_CSV = '/data/directorio_diputados_final.csv';

    Papa.parse(RUTA_CSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      encoding: 'UTF-8',
      complete: (results) => {
        setDiputados(results.data);
        setFilteredDiputados(results.data);
        setLoading(false);
        console.log('¡Éxito! CSV cargado:', results.data.length, 'diputados');
      },
      error: (err) => {
        console.error('Error al cargar o procesar el CSV:', err);
        setError(`No se pudo cargar el archivo ${RUTA_CSV}.`);
        setLoading(false);
      },
    });
  }, []);

  // Manejar búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDiputados(diputados);
      return;
    }

    const busquedaNormalizada = normalizarTexto(searchTerm);

    const filtrados = diputados.filter((dip) => {
      const nombreNorm = normalizarTexto(dip.nombre);
      const entidadNorm = normalizarTexto(dip.entidad);
      const distritoNorm = normalizarTexto(dip.distrito);
      const partidoNorm = normalizarTexto(dip.partido);

      return (
        nombreNorm.includes(busquedaNormalizada) ||
        entidadNorm.includes(busquedaNormalizada) ||
        distritoNorm.includes(busquedaNormalizada) ||
        partidoNorm.includes(busquedaNormalizada)
      );
    });

    setFilteredDiputados(filtrados);
  }, [searchTerm, diputados]);

  return (
    <>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f7f6;
        }
        h1 {
          text-align: center;
          color: #333;
        }
        .buscador {
          width: 100%;
          font-size: 1.2rem;
          padding: 12px 15px;
          margin-bottom: 25px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-sizing: border-box;
        }
        .directorio-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .diputado-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          background: #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        .diputado-card h3 {
          margin-top: 0;
          color: #0056b3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .diputado-card p {
          margin: 8px 0;
          line-height: 1.5;
          word-break: break-word;
        }

        .party-tag {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
          color: white;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .party-tag.pan {
          background-color: #004a99;
        }
        .party-tag.pri {
          background-color: #e4002b;
        }
        .party-tag.prd {
          background-color: #ffd400;
          color: #333;
        }
        .party-tag.pvem {
          background-color: #4c9c2e;
        }
        .party-tag.pt {
          background-color: #c70000;
        }
        .party-tag.mc {
          background-color: #ff8000;
        }
        .party-tag.morena {
          background-color: #800000;
        }
        .party-tag.default,
        .party-tag.sp {
          background-color: #6c757d;
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
          const email = dip.email || 'N/A';
          const extension = dip.extension || 'N/A';

          const partido = dip.partido || 'default';
          let partidoNombre = dip.partido || 'S/P';
          if (partidoNombre === 'default' || partidoNombre === 'sp') partidoNombre = 'S/P';

          return (
            <div key={`${dip.id_diputado || index}-${dip.nombre}`} className="diputado-card">
              <h3>
                {dip.nombre}
                <span className={`party-tag ${partido.toLowerCase()}`}>
                  {partidoNombre.toUpperCase()}
                </span>
              </h3>
              <p>
                <strong>Entidad:</strong> {entidad}
              </p>
              <p>
                <strong>Distrito:</strong> {distrito}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Teléfono:</strong> 55 5036 0000 | <strong>Ext:</strong> {extension}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
