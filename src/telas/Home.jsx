import { Link } from 'react-router-dom';
import { Navbar } from '../componentes/Navbar';
// 1. Alterado para importar o hook de destaque!
import { useMangaDestaque } from '../hooks/useMangaDestaque'; 
import '../App.css';

export function Home() {
  // 2. Chamada atualizada para usar o useMangaDestaque
  const { mangaDestaque, titulo, urlDaFoto, loading } = useMangaDestaque();

  if (loading) return <h2 className='carregando'>Carregando mangá...</h2>;
  if (!mangaDestaque) return <p>Nenhum mangá encontrado.</p>;

  return (
    <div className="home-container">
      {/* 1. Navbar */}
      <Navbar 
        home="Home"
        cat="Catálogos"
        sobre="Saiba Mais"
      />

      {/* 2. Banner Principal (HERO) */}
      <main className="hero-banner">
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${urlDaFoto})` }}
        />
        
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="badge">Destaques</span>
          <h1 className="hero-title">{titulo}</h1>
          <p className="hero-description">
            Sua porta de entrada para a melhor coleção de mangás selecionados.
          </p>

          <div className="hero-buttons">
            <Link to="/catalogos">
              <button className="btn btn-primary">Ver Catálogo</button>
            </Link>

            <Link to="/saiba">
              <button className="btn btn-secondary">Saiba Mais</button>
            </Link>
          </div>
        </div>
      </main>

      {/* 3. Rodapé */}
      <footer className="footer">
        <p>VORTEX MANGÁS © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );
}