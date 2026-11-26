import { useState } from 'react';
import { Link } from 'react-router';
import MapaVerde from './MapaVerde';

const TIEMPOS_DEGRADACION = {
  pet: { nombre: 'Botella de PET', tiempo: '100 a 1,000 años', tip: 'Aplástala y deposítala sin líquido.' },
  aluminio: { nombre: 'Lata de Aluminio', tiempo: '10 a 100 años', tip: 'Es 100% reciclable infinitas veces.' },
  carton: { nombre: 'Caja de Cartón', tiempo: '1 año', tip: 'Mantenla seca y doblada para ahorrar espacio.' },
  pilas: { nombre: 'Pila Alcalina', tiempo: '500 a 1,000 años', tip: 'Nunca la tires a la basura común; contamina el agua.' },
  vidrio: { nombre: 'Botella de Vidrio', tiempo: '4,000 años', tip: 'Sepárala por color si el centro lo solicita.' },
};

export default function Dashboard() {
  const [residuo, setResiduo] = useState('pet');
  const [quizRespuesta, setQuizRespuesta] = useState('');

  const infoActual = TIEMPOS_DEGRADACION[residuo];

  return (
    <div className="app-container">
      <header className="topbar">
        <div>
          <h1>E-Conecta Chihuahua 🌱</h1>
          <p className="subtitle">Panel Ambiental • ODS 11 y 12</p>
        </div>
        <div className="topbar-actions">
          <Link to="/" className="btn-primary">Cerrar sesión</Link>
        </div>
      </header>

      {/* Mapa Verde completo (filtros, mapa, detalle, lista y reportes) */}
      <MapaVerde />

      <main className="dashboard-grid">
        {/* Calculadora de degradación */}
        <section className="card">
          <h2>⏳ Calculadora de Degradación</h2>
          <label htmlFor="select-residuo">Selecciona un residuo:</label>
          <select
            id="select-residuo"
            value={residuo}
            onChange={(e) => setResiduo(e.target.value)}
            className="input-control"
          >
            <option value="pet">Botella de plástico PET</option>
            <option value="aluminio">Lata de aluminio</option>
            <option value="carton">Cartón</option>
            <option value="pilas">Pilas / Baterías</option>
            <option value="vidrio">Vidrio</option>
          </select>

          <div className="result-box">
            <h3>{infoActual.nombre}</h3>
            <p><strong>Tiempo en degradarse:</strong> {infoActual.tiempo}</p>
            <p><strong>Consejo eco:</strong> {infoActual.tip}</p>
          </div>
        </section>

        {/* Zona infantil educativa */}
        <section className="card">
          <h2>🧩 Zona Infantil: Mini Reto Verde</h2>
          <p>¿En qué contenedor va una botella de plástico limpia?</p>
          <div className="quiz-buttons">
            <button
              onClick={() => setQuizRespuesta('¡Correcto! Va en el contenedor de plásticos/reciclables ♻️')}
              className="btn-outline"
            >
              Reciclables (PET)
            </button>
            <button
              onClick={() => setQuizRespuesta('Casi, ahí van cáscaras y restos de comida 🍎')}
              className="btn-outline"
            >
              Orgánicos
            </button>
          </div>
          {quizRespuesta && <p className="quiz-feedback">{quizRespuesta}</p>}
        </section>
      </main>
    </div>
  );
}