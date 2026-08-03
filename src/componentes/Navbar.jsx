// src/componentes/Navbar.jsx
import { NavLink } from 'react-router-dom';
import logo from '../assets/Vortex.png'; 

export function Navbar({ info, home, cat, sobre }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo do Projeto" className="logo-img"/>
      <h1>VORTEX MANGÁS</h1>
      
      <p>{info}</p>
      <nav>
        {home && <NavLink to="/">{home}</NavLink>}
        {cat && <NavLink to="/catalogos">{cat}</NavLink>}
        {sobre && <NavLink to="/saiba">{sobre}</NavLink>}
      </nav>
    </header>
  );
}