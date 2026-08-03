import { useState } from 'react';
import { Navbar } from '../componentes/Navbar';
import { CardManga } from '../componentes/CardManga';
import { useMangaSearch } from '../hooks/useMangaSearch';

export function Catalogos() {
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);

  const { mangas, totalPages, loading } = useMangaSearch(busca, pagina);

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
    setPagina(1);
  };

  // Função para gerar os números das páginas com reticências (...)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Quantidade de botões numéricos visíveis

    let startPage = Math.max(1, pagina - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return { pages, startPage, endPage };
  };

  const { pages, startPage, endPage } = getPageNumbers();

  return (
    <div className="home-container">
      <Navbar home="Home" cat="Catálogos" sobre="Saiba Mais" />

      <main className="catalogo-container">
        <input 
          type="text" 
          placeholder="Buscar mangá..." 
          value={busca} 
          onChange={handleBuscaChange} 
          className="search-input"
        />

        {loading ? (
          <h2 className="carregando">Carregando mangás...</h2>
        ) : (
          <>
            <div className="manga-grid">
              {mangas.map(manga => (
                <CardManga key={manga.id} manga={manga} />
              ))}
            </div>

            {/* Controles de Paginação Completos */}
            <div className="paginacao">
              {/* Primeiros Botões */}
              <button disabled={pagina === 1} onClick={() => setPagina(1)}>
                ««
              </button>
              <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>
                ‹
              </button>

              {/* Reticências no início */}
              {startPage > 1 && (
                <>
                  <button onClick={() => setPagina(1)}>1</button>
                  {startPage > 2 && <span className="reticencias">...</span>}
                </>
              )}

              {/* Páginas Numéricas */}
              {pages.map(num => (
                <button
                  key={num}
                  className={pagina === num ? 'ativo' : ''}
                  onClick={() => setPagina(num)}
                >
                  {num}
                </button>
              ))}

              {/* Reticências no fim */}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <span className="reticencias">...</span>}
                  <button onClick={() => setPagina(totalPages)}>{totalPages}</button>
                </>
              )}

              {/* Últimos Botões */}
              <button disabled={pagina >= totalPages} onClick={() => setPagina(p => p + 1)}>
                ›
              </button>
              <button disabled={pagina >= totalPages} onClick={() => setPagina(totalPages)}>
                »»
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}