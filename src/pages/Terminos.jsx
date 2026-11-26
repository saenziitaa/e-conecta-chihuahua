import { Link } from 'react-router';

export default function Terminos() {
  return (
    <div className="app-container">
      <header className="topbar">
        <div>
          <h1>Términos de Uso</h1>
          <p className="subtitle">E-Conecta Chihuahua</p>
        </div>
        <Link to="/" className="btn-outline">← Volver al inicio</Link>
      </header>

      <main className="card">
        <h2>📄 Uso de la información</h2>
        <p>
          La información sobre centros de reciclaje, horarios y tiempos de degradación en esta
          aplicación tiene fines informativos, educativos y comunitarios. Te recomendamos verificar
          horarios especiales o cambios de acopio antes de trasladarte.
        </p>
      </main>
    </div>
  );
}