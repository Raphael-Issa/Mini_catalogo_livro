// src/telas/DetalhesManga.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useMangaDetails } from '../hooks/useMangaDetails';
import { MangaDetailDisplay } from '../componentes/MangaDetailDisplay'; // Importa o novo componente

export function DetalhesManga() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Puxa os dados do hook (manga, titulo, descricao, urlCapa, nota)
  const { manga, titulo, descricao, urlCapa, nota, loading, error } = useMangaDetails(id);

  if (loading) return <h2 className="carregando">Carregando detalhes...</h2>;
  if (error || !manga) return <h2 className="carregando">Mangá não encontrado.</h2>;

  return (
    <div className="home-container">
      <main className="detalhes-container">
        <button onClick={() => navigate(-1)} className="btn-voltar">
          ← Voltar ao Catálogo
        </button>

        {/* Chama o componente repassando os dados */}
        <MangaDetailDisplay 
          manga={manga}
          titulo={titulo}
          descricao={descricao}
          urlCapa={urlCapa}
          nota={nota}
        />
      </main>

      <footer className="footer">
        <p>VORTEX MANGÁS © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );
}