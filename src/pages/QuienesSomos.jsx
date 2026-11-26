import { Link } from 'react-router';

export default function QuienesSomos() {
  return (
    <div className="app-container">
      <header className="topbar">
        <div>
          <h1>Quiénes Somos</h1>
          <p className="subtitle">Equipo de desarrollo de E-Conecta Chihuahua</p>
        </div>
        <Link to="/" className="btn-outline">← Volver al inicio</Link>
      </header>

      <main className="card">
        <h2>💚 Nuestra misión en Chihuahua</h2>
        <p>
          Somos un equipo estudiantil enfocado en conectar a los habitantes de Chihuahua con puntos
          limpios, centros de reciclaje y recursos educativos para reducir residuos urbanos y
          fomentar hábitos sostenibles alineados con los ODS 11 y 12.
        </p>
      </main>
    </div>
  );
}