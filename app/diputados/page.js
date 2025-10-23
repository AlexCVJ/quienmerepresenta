'use client';

import { useState, useEffect } from 'react';

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
