'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <style jsx>{`
        body {
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9eff5 100%);
          margin: 0;
          padding: 25px;
        }

        .container {
          max-width: 900px;
          margin: 20px auto;
          padding: 30px 40px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04);
        }

        header {
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 25px;
          margin-bottom: 30px;
        }
        header h1 {
          color: #2c3e50;
          font-size: 2.8rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }
        header h2 {
          color: #2c3e50;
          font-weight: 500;
        }

        .intro-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #34495e;
          margin-bottom: 30px;
          text-align: justify;
        }
        .intro-text h2 {
          text-align: center;
          color: #2c3e50;
          font-weight: 500;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 40px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .navigation-header {
          text-align: center;
          color: #34495e;
          font-size: 1.6rem;
          font-weight: 500;
          margin-bottom: 25px;
          border-top: 1px solid #e0e0e0;
          padding-top: 40px;
        }

        nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }
        .choice-button {
          display: block;
          padding: 30px 50px;
          font-size: 1.3rem;
          font-weight: 700;
          text-decoration: none;
          color: #ffffff;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          transition: all 0.25s ease-out;
          border-bottom: 3px solid rgba(0, 0, 0, 0.2);
        }
        .choice-button:hover {
          transform: translateY(-6px);
          filter: brightness(1.1);
        }

        .diputados {
          background: linear-gradient(45deg, #800000, #a10000);
          box-shadow: 0 6px 15px -5px rgba(128, 0, 0, 0.6);
        }
        .diputados:hover {
          box-shadow: 0 10px 20px -5px rgba(128, 0, 0, 0.5);
        }

        .senadores {
          background: linear-gradient(45deg, #004a99, #005fbf);
          box-shadow: 0 6px 15px -5px rgba(0, 74, 153, 0.6);
        }
        .senadores:hover {
          box-shadow: 0 10px 20px -5px rgba(0, 74, 153, 0.5);
        }
      `}</style>

      <div className="container">
        <header>
          <h1>¡NO AL IMPUESTO A VIDEOJUEGOS!</h1>
          <h2>#elgamingsalva</h2>
        </header>

        <section className="intro-text">
          <h2>ES MOMENTO DE TOMAR ACCIONES</h2>
          <p>
            Un impuesto del 8 % a videojuegos considerados violentos ha sido propuesto para el 2026 en México. Esta iniciativa fiscal viene respaldada por los llamados &quot;impuestos saludables&quot;.

            Se menciona que los videojuegos son perjudiciales para la salud mental de niños y adolescentes, causando efectos adversos como la depresión y generando violencia.

            El prejuicio de que los juegos generan violencia es uno que hemos visto a través de los años.
          </p>

          <p>
            Sin embargo, estas afirmaciones han sido descartadas por varios estudios que no muestran correlación.

            La propuesta fiscal cita estudios desactualizados con datos de hace más de 15 años, tiempo en el cual ha habido un avance significativo en el estudio de la correlación de juegos violentos con violencia real.

            Si así fuera, ¿no sería Japón, cuna de los videojuegos, uno de los países más violentos del mundo? Pero, ¡no lo es!.
          </p>

          <p>
            De hecho, contrario a los fundamentos detrás de este impuesto, se ha encontrado en estudios que los videojuegos pueden ayudar con temas de depresión y ansiedad, desarrollar habilidades cognitivas y mantener la habilidad mental de niños y adultos.
          </p>

          <p>
            Para nosotros esto es un medio más allá del entretenimiento. Nos ayuda a desestresarnos, hemos hecho amigos y hemos formado comunidad.
            El encarecimiento de los videojuegos con una justificación basada en datos erróneos, solo hace más caro este hobbie para nosotros a favor de la tributación.
            Así que digamos no al estigma de que &quot;Los videojuegos generan violencia&quot;.
          </p>

          <p>
            Hagamos nuestra voz ser escuchada por aquellos que han sido elegidos para representarnos.
            Aquí te damos un directorio de tus diputados y senadores. Encuentra a tu representante, puedes buscarlo por estado, nombre, distrito, etc.
            Escribe un correo electrónico, haz una llamada a su oficina. Siempre con el respeto por delante. Y hazles saber que como su representado, no quieres que se apruebe esta medida.
          </p>
        </section>

        <section className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/URL_DEL_VIDEO_VA_AQUI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </section>

        <h2 className="navigation-header">
          Encuentra y contacta a tus representantes
        </h2>

        <nav>
          <Link href="/diputados" className="choice-button diputados">
            Directorio de Diputados
          </Link>
          <Link href="/senadores" className="choice-button senadores">
            Directorio de Senadores
          </Link>
        </nav>
      </div>
    </>
  );
}
