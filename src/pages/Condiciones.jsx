import { Link } from 'react-router';

export default function Condiciones() {
  return (
    <div className="app-container">
      <header className="topbar">
        <div>
          <h1>Condiciones del Servicio</h1>
          <p className="subtitle">E-Conecta Chihuahua</p>
        </div>
        <Link to="/" className="btn-outline">← Volver al inicio</Link>
      </header>

      <main className="card">
        <h2>🌿 Participación responsable</h2>
        <p>
          Al utilizar E-Conecta Chihuahua te comprometes a navegar de forma respetuosa, cuidar los
          espacios públicos y fomentar prácticas responsables de separación de residuos en tu
          colonia o escuela.
        </p>
      </main>
    </div>
  );
}