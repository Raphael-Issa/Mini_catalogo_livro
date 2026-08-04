import { Navbar } from '../componentes/Navbar';
import { CardManga } from '../componentes/CardManga';
import { Paginacao } from '../componentes/Paginacao';
import { useMangaSearch } from '../hooks/useMangaSearch';
import { useCatalogParams } from '../hooks/useCatalogParams';

export function Catalogos() {
  const { busca, pagina, setPagina, handleBuscaChange } = useCatalogParams();
  const { mangas, totalPages: totalPagesAPI, loading } = useMangaSearch(busca, pagina);

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
              {mangas.map((manga) => (
                <CardManga key={manga.id} manga={manga} />
              ))}
            </div>

            <Paginacao
              pagina={pagina}
              totalPagesAPI={totalPagesAPI}
              setPagina={setPagina}
            />
          </>
        )}
      </main>
    </div>
  );
}