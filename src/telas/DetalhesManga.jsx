import { useParams, useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate em vez do Link
import { Navbar } from '../componentes/Navbar';
import { useMangaDetails } from '../hooks/useMangaDetails';

export function DetalhesManga() {
  const { id } = useParams();
  const navigate = useNavigate(); // 2. Instancie o hook
  const { manga, titulo, descricao, urlCapa, loading, error } = useMangaDetails(id);

  if (loading) return <h2 className="carregando">Carregando detalhes...</h2>;
  if (error || !manga) return <h2 className="carregando">Mangá não encontrado.</h2>;

  return (
    <div className="home-container">
      <main className="detalhes-container">
        {/* 3. Troque o Link por um botão com navigate(-1) */}
        <button onClick={() => navigate(-1)} className="btn-voltar">
          ← Voltar ao Catálogo
        </button>
        
        <div className="detalhes-content">
          <img src={urlCapa} alt={titulo} className="detalhes-capa" />
          
          <div className="detalhes-info">
            <h1>{titulo}</h1>
            
            <div className="detalhes-meta">
              <span><strong>Status:</strong> {manga.attributes?.status || 'Desconhecido'}</span>
              <span><strong>Ano:</strong> {manga.attributes?.year || 'N/A'}</span>
            </div>

            <div className="sinopse-box">
              <h3>Sinopse</h3>
              <p>{descricao}</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>VORTEX MANGÁS © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );
}