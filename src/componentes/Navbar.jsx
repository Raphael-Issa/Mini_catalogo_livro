import { Link } from 'react-router-dom';

export function Navbar({ home, cat, sobre }) {
  return (
    <header>
      {/* Envolve a logo e o título juntos */}
      <div className="logo-container">
        <img src="/Vortex.png" alt="Logo Vortex" className="logo-img" />
        <h1>VORTEX MANGÁS</h1>
        <img src="/Vortex.png" alt="Logo Vortex" className="logo-img" />
      </div>

      <nav>
        <Link to="/">{home}</Link>
        <Link to="/catalogos">{cat}</Link>
        <Link to="/saiba">{sobre}</Link>
      </nav>
    </header>
  );
}