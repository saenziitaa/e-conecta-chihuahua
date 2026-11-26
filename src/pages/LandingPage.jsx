import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './landing.css';

// Logo SVG kawaii (planetita con arbolitos)
function LogoPlanetita({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="26" fill="#E8F5E9" />
      <rect x="21" y="13" width="2.5" height="6" rx="1" fill="#795548" />
      <circle cx="22.2" cy="11.5" r="4.5" fill="#4CAF50" />
      <rect x="30.8" y="9" width="2.5" height="7" rx="1" fill="#795548" />
      <circle cx="32" cy="7.5" r="5.5" fill="#2E7D32" />
      <rect x="40.5" y="13" width="2.5" height="6" rx="1" fill="#795548" />
      <circle cx="41.7" cy="11.5" r="4.5" fill="#66BB6A" />
      <circle cx="32" cy="36" r="19" fill="#81C784" stroke="#2E7D32" strokeWidth="2.5" />
      <path d="M18 31C21 29 24 31 23 35C22 38 17 38 16 35Z" fill="#A5D6A7" />
      <path d="M41 27C44 27 47 30 46 34C45 37 41 36 40 33Z" fill="#A5D6A7" />
      <circle cx="26.5" cy="36" r="2" fill="#1B5E20" />
      <circle cx="37.5" cy="36" r="2" fill="#1B5E20" />
      <circle cx="27.2" cy="35.3" r="0.7" fill="#FFFFFF" />
      <circle cx="38.2" cy="35.3" r="0.7" fill="#FFFFFF" />
      <ellipse cx="23.5" cy="38.5" rx="2.2" ry="1.2" fill="#F48FB1" opacity="0.75" />
      <ellipse cx="40.5" cy="38.5" rx="2.2" ry="1.2" fill="#F48FB1" opacity="0.75" />
      <path d="M29.5 39C30.5 40.8 33.5 40.8 34.5 39" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const NOTICIAS_CHIHUAHUA = [
  {
    id: 1,
    categoria: 'Calidad del Aire',
    titulo: 'Calidad del aire en Chihuahua Capital se mantiene en nivel Bueno',
    fecha: 'Hoy · Red de Monitoreo Ambiental',
    resumen:
      'Vientos ligeros del suroeste favorecen la dispersión de partículas PM10 en la zona norte y centro de la ciudad.',
  },
  {
    id: 2,
    categoria: 'Acopio Especial',
    titulo: 'Jornada de Acopio de Pilas y Electrónicos este sábado en El Palomar',
    fecha: 'Este fin de semana · 9:00 a 14:00 hrs',
    resumen:
      'Lleva tus pilas alcalinas, celulares viejos y cargadores para evitar que contaminen los mantos freáticos de Chihuahua.',
  },
  {
    id: 3,
    categoria: 'Comunidad CUU',
    titulo: 'Estudiantes recolectan más de 2 toneladas de PET en Presa El Rejón',
    fecha: 'Hace 2 días · Colectivos Verdes CUU',
    resumen: 'Más de 120 jóvenes y familias participaron en la jornada dominical de recolección separada.',
  },
];

export default function LandingPage() {
  const [temperatura, setTemperatura] = useState('24°C');

  // Temperatura actual de Chihuahua (Open-Meteo)
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6353&longitude=-106.0889&current_weather=true')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current_weather) {
          setTemperatura(`${Math.round(data.current_weather.temperature)}°C`);
        }
      })
      .catch(() => {
        // Si no hay red se queda el valor por defecto
      });
  }, []);

  return (
    <div className="landing">
      {/* BARRA DE NAVEGACIÓN */}
      <header className="header">
        <div className="headerInner">
                    <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
            <LogoPlanetita size={42} />
            <div>
              <span className="brandTitle">E-Conecta</span>
              <span className="brandSub">Chihuahua Sostenible</span>
            </div>
          </Link>

          <div className="odsBadges">
            <span className="odsPill">ODS 11 · Ciudades Sostenibles</span>
            <span className="odsPill">ODS 12 · Consumo Responsable</span>
          </div>

          {/* Navegación escritorio */}
          <nav className="navDesktop">
            <Link to="/" className="navBtn navBtnActive">🌍 Inicio</Link>
            <Link to="/quienes-somos" className="navBtn">👥 Quiénes somos</Link>
            <Link to="/login" className="navBtn">🔐 Iniciar sesión</Link>
          </nav>
        </div>
      </header>

      {/* Navegación móvil (barra inferior) */}
      <nav className="navMobile">
        <Link to="/" className="navBtn navBtnActive">
          <span>🌍</span>
          <span>Inicio</span>
        </Link>
        <Link to="/quienes-somos" className="navBtn">
          <span>👥</span>
          <span>Quiénes somos</span>
        </Link>
        <Link to="/login" className="navBtn">
          <span>🔐</span>
          <span>Iniciar sesión</span>
        </Link>
      </nav>

      {/* CONTENIDO */}
      <main className="mainContainer">
        <section>
          <div className="welcomeHero animateFadeUp">
            <div className="planetFloat" style={{ display: 'inline-block' }}>
              <LogoPlanetita size={96} />
            </div>
            <h1 className="welcomeTitle">E-Conecta</h1>
            <p className="welcomeQuote">
              "Conectar cada colonia de Chihuahua con un punto verde es sembrar hoy el aire limpio y el futuro
              sostenible que mañana vamos a respirar."
            </p>
            <Link to="/login" className="ctaStartBtn">
              <span>Comenzar Exploración en el Mapa</span>
              <span>→</span>
            </Link>
          </div>

          <div className="animateFadeUpDelay1">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.85rem',
              }}
            >
              <h2 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>🌿 Pulso Ambiental en Chihuahua</h2>
              <span className="odsPill">Actualizado hoy · {temperatura}</span>
            </div>

            <div className="autoGrid">
              {NOTICIAS_CHIHUAHUA.map((noticia) => (
                <article key={noticia.id} className="card">
                  <span className="odsPill" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                    {noticia.categoria}
                  </span>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>{noticia.titulo}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--sage-dark)', marginBottom: '0.5rem' }}>
                    {noticia.fecha}
                  </p>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{noticia.resumen}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="footer">
        <div className="footerInner">
          <div>
            <strong>E-Conecta Chihuahua (Prototipo Académico)</strong>
            <p>Alineado con los Objetivos de Desarrollo Sostenible (ODS 11 y ODS 12).</p>
          </div>
          <div className="footerLinks">
            <Link to="/terminos">Términos</Link>
            <Link to="/condiciones">Condiciones</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}