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