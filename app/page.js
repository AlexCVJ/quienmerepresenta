'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-gradient animate-gradient">
                ¡NO AL IMPUESTO
              </span>
              <span className="block text-gradient animate-gradient" style={{ animationDelay: '0.2s' }}>
                A VIDEOJUEGOS!
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-purple-200 font-semibold mb-4">
              #elgamingsalva
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-gaming-pink via-gaming-orange to-gaming-light mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)"/>
          </svg>
        </div>
      </section>

      {/* Quick Access Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-12">
        <div className={`transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center">
              Encuentra a tus representantes
            </h2>
            <p className="text-center text-slate-600 mb-6 max-w-2xl mx-auto">
              Accede directamente a los directorios completos de Diputados y Senadores
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Diputados Button */}
              <Link href="/diputados">
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        📋 Diputados
                      </h3>
                      <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-sm">
                      Congreso de México - LXVI Legislatura
                    </p>
                  </div>
                </div>
              </Link>

              {/* Senadores Button */}
              <Link href="/senadores">
                <div className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        🏛️ Senadores
                      </h3>
                      <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-purple-100 text-sm">
                      Congreso de México - LXV Legislatura
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              ES MOMENTO DE TOMAR ACCIONES
            </h2>

            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="font-semibold text-red-900 mb-2">La Situación:</p>
                <p>
                  Un impuesto del <strong>8%</strong> a videojuegos considerados violentos ha sido propuesto para el 2026 en México.
                  Esta iniciativa fiscal viene respaldada por los llamados "impuestos saludables".
                </p>
              </div>

              <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <p className="font-semibold text-amber-900 mb-2">El Argumento:</p>
                <p>
                  Se menciona que los videojuegos son perjudiciales para la salud mental de niños y adolescentes,
                  causando efectos adversos como la depresión y generando violencia. El prejuicio de que los juegos
                  generan violencia es uno que hemos visto a través de los años.
                </p>
              </div>

              <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="font-semibold text-blue-900 mb-2">La Realidad:</p>
                <p>
                  Sin embargo, estas afirmaciones han sido descartadas por varios estudios que no muestran correlación.
                  La propuesta fiscal cita estudios desactualizados con datos de hace más de 15 años.
                  Si así fuera, ¿no sería Japón, cuna de los videojuegos, uno de los países más violentos del mundo?
                  <strong> ¡Pero no lo es!</strong>
                </p>
              </div>

              <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <p className="font-semibold text-green-900 mb-2">Los Beneficios:</p>
                <p>
                  De hecho, contrario a los fundamentos detrás de este impuesto, se ha encontrado en estudios que
                  los videojuegos pueden ayudar con temas de depresión y ansiedad, desarrollar habilidades cognitivas
                  y mantener la habilidad mental de niños y adultos.
                </p>
              </div>

              <div className="mt-8 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <p className="text-xl font-semibold text-purple-900 mb-4">
                  💜 Para nosotros esto es más que entretenimiento
                </p>
                <p className="mb-4">
                  Nos ayuda a desestresarnos, hemos hecho amigos y hemos formado comunidad.
                  El encarecimiento de los videojuegos con una justificación basada en datos erróneos,
                  solo hace más caro este hobbie para nosotros a favor de la tributación.
                </p>
                <p className="font-bold text-purple-900">
                  Así que digamos NO al estigma de que "Los videojuegos generan violencia".
                </p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Aprende más sobre la iniciativa
            </h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://youtube.com/shorts/FNHpfWPBBj0?si=u6ff0xJU1BEQhBS9"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 sm:p-12 text-white mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              Haz que tu voz sea escuchada
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-center max-w-3xl mx-auto">
              Aquí te damos un directorio de tus diputados y senadores. Encuentra a tu representante,
              puedes buscarlo por estado, nombre, distrito, etc. Escribe un correo electrónico,
              haz una llamada a su oficina. <strong>Siempre con el respeto por delante.</strong> Y hazles saber que
              como su representado, no quieres que se apruebe esta medida.
            </p>
          </div>

          {/* Navigation Cards */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              Encuentra y contacta a tus representantes
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Diputados Card */}
              <Link href="/diputados">
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative p-8 sm:p-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        Diputados
                      </h3>
                      <svg className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-lg mb-6">
                      Accede al directorio completo de Diputados del Congreso de México
                    </p>
                    <div className="flex items-center text-white font-semibold">
                      <span>Ver directorio</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-tl-full"></div>
                </div>
              </Link>

              {/* Senadores Card */}
              <Link href="/senadores">
                <div className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative p-8 sm:p-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        Senadores
                      </h3>
                      <svg className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-purple-100 text-lg mb-6">
                      Accede al directorio completo de Senadores del Congreso de México
                    </p>
                    <div className="flex items-center text-white font-semibold">
                      <span>Ver directorio</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-tl-full"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">#elgamingsalva</p>
            <p className="text-slate-400">
              Una iniciativa de la comunidad gaming mexicana
            </p>
           
          </div>
        </div>
      </footer>
    </div>
  );
}


