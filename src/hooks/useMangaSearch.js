/**
 * HOOK: useMangaSearch
 * * RESPONSABILIDADE:
 * Gerenciar a busca paginada, o estado de carregamento e a lista de mangás do catálogo.
 * * FUNCIONALIDADES:
 * 1. Reatividade (useEffect): Monitora alterações em 'query' (termo de busca) e 'page' (página atual) para refazer a requisição.
 * 2. Integração: Consome a função `searchMangas` da camada de serviços (MangaDexApi).
 * 3. Gerenciamento de Estado: Atualiza a lista de mangás retornados, o total de páginas calculadas e o estado de 'loading'.
 * * RETORNO:
 * Objeto contendo o array 'mangas' (já com as notas e capas tratadas), o número de 'totalPages' e a flag 'loading'.
 */

import { useState, useEffect } from 'react';
import { searchMangas } from '../services/MangaDexApi'; // Importa a função do service

export function useMangaSearch(query = '', page = 1) {
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMangas() {
      try {
        setLoading(true);
        
        // Chama a função isolada da pasta services
        const { mangas, totalPages } = await searchMangas(query, page);

        setMangas(mangas);
        setTotalPages(totalPages);
      } catch (err) {
        console.error("Erro ao buscar catálogo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMangas();
  }, [query, page]);

  // Retorna exatamente a mesma estrutura para não quebrar a UI
  return { mangas, totalPages, loading };
}


//useState(...): Guarda os dados que a tela precisa exibir (mangas, totalPages) e o estado de carregamento (loading).

// useEffect(..., [query, page]): Sempre que o usuário digitar algo novo no campo de busca (query) 
// ou clicar para ir para a próxima página (page), o efeito é disparado automaticamente.

// await searchMangas(query, page): O hook simplesmente "terceiriza" a busca para o service que explicamos no Passo 1.

// return { mangas, totalPages, loading }: Disponibiliza os estados para qualquer componente visual da sua aplicação usar.