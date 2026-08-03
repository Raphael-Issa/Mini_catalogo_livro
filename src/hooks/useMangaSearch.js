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

        // Monta a URL incluindo limit, offset e o termo de busca se existir
        let url = `https://api.mangadex.org/manga?limit=${LIMIT}&offset=${offset}&includes[]=cover_art`;
        if (query) {
          url += `&title=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setMangas(data.data || []);
        
        // A API retorna 'total' com a contagem total de resultados disponíveis
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