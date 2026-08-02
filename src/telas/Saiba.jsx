import { useState, useEffect } from 'react';
import { Navbar } from '../componentes/Navbar';
import '../App.css';
import { Descricao } from '../componentes/Descricao';

export function Saiba(){


return (
    <div className="home-container">
      {/* 1. Navbar única do topo */}
      <Navbar 
        tituloSite="Vortex Mangás"
        home="Home"
        cat="Catálogos"
        sobre="Saiba Mais"
      />

      <Descricao 
        titulo="Sobre o Projeto" 
        info="Este é um texto explicativo passado via prop." 
      />

      {/* 3. Rodapé simples */}
      <footer className="footer">
        <p>ISEKAI HUB © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );

}