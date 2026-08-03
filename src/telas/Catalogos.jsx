import { Navbar } from '../componentes/Navbar';
import '../App.css';


export function Catalogos(){


return (
    <div className="home-container">
      {/* 1. Navbar única do topo */}
      <Navbar 
        tituloSite="Vortex Mangás"
        home="Home"
        cat="Catálogos"
        sobre="Saiba Mais"
      />








      {/* 3. Rodapé simples */}
      <footer className="footer">
        <p>VORTEX MANGÁS © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );

}