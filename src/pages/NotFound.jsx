import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: '480px', margin: '2rem auto', textAlign: 'center' }}>
        <h2>🍃 404 — Ruta no encontrada</h2>
        <p style={{ marginTop: '0.5rem' }}>
          Parece que esta dirección no existe dentro de E-Conecta Chihuahua.
        </p>
        <div className="quiz-buttons" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/" className="btn-primary">Ir al inicio</Link>
          <Link to="/dashboard" className="btn-outline">Ver mapa</Link>
        </div>
      </div>
    </div>
  );
}