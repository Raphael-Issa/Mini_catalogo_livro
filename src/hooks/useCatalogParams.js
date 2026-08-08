/**
 * HOOK: useCatalogParams
 * * RESPONSABILIDADE:
 * Sincronizar o estado da busca e da paginação do catálogo diretamente com a URL.
 * * FUNCIONALIDADES:
 * 1. Leitura: Extrai os parâmetros 'busca' e 'pagina' atuais da barra de endereço.
 * 2. Atualização de Página: Altera a página na URL mantendo os limites (min: 1, max: totalPages).
 * 3. Busca em Tempo Real: Atualiza o termo de busca na URL e reseta a paginação para a página 1.
 * 4. UX: Rola a tela suavemente para o topo (scrollTop) sempre que a página muda.
 * * VANTAGEM:
 * Permite compartilhar links diretos da pesquisa/página e mantém o histórico
 * funcional ao usar os botões "Voltar" e "Avançar" do navegador.
 */


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