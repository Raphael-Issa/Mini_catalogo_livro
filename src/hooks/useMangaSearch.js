import { useState, useEffect } from 'react';

export function useMangaSearch(query = '', page = 1) {
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const LIMIT = 20; // 20 mangás por página

  useEffect(() => {
    async function fetchMangas() {
      try {
        setLoading(true);
        const offset = (page - 1) * LIMIT;

        // Adicionamos order[relevance]=desc para pedir prioridade à API
        let url = `https://api.mangadex.org/manga?limit=${LIMIT}&offset=${offset}&includes[]=cover_art&order[relevance]=desc`;
        
        if (query) {
          url += `&title=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        let results = data.data || [];

        // Se houver uma busca ativa, aplicamos a lógica de priorização visual
        if (query.trim()) {
          const cleanQuery = query.trim().toLowerCase();

          results = [...results].sort((a, b) => {
            // Pega o título principal (geralmente em 'en' ou o primeiro disponível)
            const titleA = (a.attributes?.title?.en || Object.values(a.attributes?.title || {})[0] || '').toLowerCase();
            const titleB = (b.attributes?.title?.en || Object.values(b.attributes?.title || {})[0] || '').toLowerCase();

            // Lógica de pontuação de relevância
            const getScore = (title) => {
              if (title === cleanQuery) return 3; // Correspondência exata
              if (title.startsWith(cleanQuery)) return 2; // Começa com a palavra
              return 1; // Contém a palavra em outro lugar
            };

            const scoreA = getScore(titleA);
            const scoreB = getScore(titleB);

            // Se as pontuações forem diferentes, ordena do maior para o menor
            if (scoreA !== scoreB) {
              return scoreB - scoreA;
            }

            // Se empatarem na pontuação, prioriza títulos mais curtos (mais próximos da busca original)
            return titleA.length - titleB.length;
          });
        }

        setMangas(results);

        const totalItems = data.total || 0;
        setTotalPages(Math.ceil(totalItems / LIMIT));
      } catch (err) {
        console.error("Erro ao buscar catálogo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMangas();
  }, [query, page]);

  return { mangas, totalPages, loading };
}