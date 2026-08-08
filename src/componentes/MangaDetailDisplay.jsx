// src/componentes/MangaDetailDisplay.jsx
import React from 'react';

export function MangaDetailDisplay({ manga, titulo, descricao, urlCapa, nota }) {
  const status = manga?.attributes?.status || 'Desconhecido';
  const ano = manga?.attributes?.year || 'N/A';

  return (
    <div className="detalhes-content">
      <div className="detalhes-capa-wrapper">
        <img src={urlCapa} alt={titulo} className="detalhes-capa" />
        
        {/* Badge da nota caso exista */}
        {nota && (
          <div className="detalhes-nota-badge">
            ★ {nota}
          </div>
        )}
      </div>

      <div className="detalhes-info">
        <h1>{titulo}</h1>

        <div className="detalhes-meta">
          <span><strong>Status:</strong> {status}</span>
          <span><strong>Ano:</strong> {ano}</span>
        </div>

        <div className="sinopse-box">
          <h3>Sinopse</h3>
          <p>{descricao}</p>
        </div>
      </div>
    </div>
  );
}