// src/hooks/useMangaDetails.js
/**
 * HOOK: useMangaDetails
 * * RESPONSABILIDADE:
 * Gerenciar a busca, estado e erros das informações detalhadas de um único mangá por ID.
 * * FUNCIONALIDADES:
 * 1. Ciclo de Vida (useEffect): Reage a alterações no 'id' da URL e dispara a requisição.
 * 2. Integração: Consome a função `getMangaDetailsById` da camada de serviços (MangaDexApi).
 * 3. Gerenciamento de Estado: Controla 'loading' (carregamento) e 'error' para feedback visual na tela.
 * * RETORNO:
 * Objeto contendo os dados mastigados (manga, titulo, descricao, urlCapa, nota) juntamente com as flags 'loading' e 'error'.
 */
import { useState, useEffect } from 'react';
import { getMangaDetailsById } from '../services/MangaDexApi'; // Importa a função do service

export function useMangaDetails(id) {
  const [data, setData] = useState({ manga: null, titulo: '', descricao: '', urlCapa: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMangaDetails() {
      try {
        setLoading(true);
        setError(null);
        
        // Chama a função isolada da pasta services
        const details = await getMangaDetailsById(id);
        
        setData(details);
      } catch (err) {
        console.error("Erro no useMangaDetails:", err);
        setError('Erro ao carregar os detalhes do mangá.');
      } finally {
        setLoading(false);
      }
    }

    fetchMangaDetails();
  }, [id]);

  // Retorna exatamente a mesma estrutura de antes
  return { ...data, loading, error };
}