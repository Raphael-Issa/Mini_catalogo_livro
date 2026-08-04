import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = searchParams.get('busca') || '';
  const pagina = Number(searchParams.get('pagina')) || 1;

  // Rola suavemente para o topo ao trocar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagina]);

  const setPagina = (novaPagina, totalPages = 100) => {
    const proxima = typeof novaPagina === 'function' ? novaPagina(pagina) : novaPagina;
    const paginaValida = Math.min(Math.max(1, proxima), totalPages);

    setSearchParams((prev) => {
      prev.set('pagina', paginaValida);
      return prev;
    });
  };

  const handleBuscaChange = (e) => {
    const valor = e.target.value;
    setSearchParams((prev) => {
      if (valor) {
        prev.set('busca', valor);
      } else {
        prev.delete('busca');
      }
      prev.set('pagina', 1);
      return prev;
    });
  };

  return { busca, pagina, setPagina, handleBuscaChange };
}