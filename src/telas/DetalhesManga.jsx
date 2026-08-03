import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../componentes/Navbar';
import { useMangaDetails } from '../hooks/useMangaDetails';

export function DetalhesManga() {
  const { id } = useParams();
  const { manga, titulo, descricao, urlCapa, loading, error } = useMangaDetails(id);

  if (loading) return <h2 className="carregando">Carregando detalhes...</h2>;
  if (error || !manga) return <h2 className="carregando">Mangá não encontrado.</h2>;

  return (
    <div className="home-container">
      <Navbar home="Home" cat="Catálogos" sobre="Saiba Mais" />

      <main className="detalhes-container">
        <Link to="/catalogos" className="btn-voltar">← Voltar ao Catálogo</Link>
        
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