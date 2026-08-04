import { useState, useEffect } from 'react';
import { getPopularMangas } from '../services/MangaDexApi';

export function usePopularMangas() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await getPopularMangas();
        setMangas(dados || []);
      } catch (erro) {
        console.error("Erro ao carregar mangás:", erro);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return { mangas, loading };
}