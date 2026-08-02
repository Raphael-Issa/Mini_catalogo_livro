// src/componentes/Navbar.jsx
import { Link } from 'react-router-dom';
export function Navbar({ tituloSite,info,home,cat,sobre}) {
  return (
    <header className="header">
      <h1>{tituloSite}</h1>
      <p>{info}</p>
      <nav>
        {home && <Link to="/">{home}</Link>}
        {cat && <Link to="/catalogos">{cat}</Link>}
        {sobre && <Link to="/saiba">{sobre}</Link>}
      </nav>
    </header>
  );
}