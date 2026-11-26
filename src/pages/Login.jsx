import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: '420px', margin: '2rem auto' }}>
        <h2>🔐 Iniciar sesión en E-Conecta</h2>
        <p className="subtitle" style={{ marginBottom: '1rem' }}>
          Accede al panel del mapa de reciclaje y herramientas ambientales.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            className="input-control"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="password" style={{ display: 'block', marginTop: '0.75rem' }}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="input-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="quiz-buttons" style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Entrar al Dashboard</button>
            <Link to="/" className="btn-outline">Volver al inicio</Link>
          </div>
        </form>
      </div>
    </div>
  );
}