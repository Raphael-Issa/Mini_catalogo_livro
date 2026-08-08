/**
 * HOOK: usePopularMangas
 * * RESPONSABILIDADE:
 * Buscar e disponibilizar a lista inicial de mangás mais populares/seguidos para a aplicação.
 * * FUNCIONALIDADES:
 * 1. Disparo Único (useEffect com []): Carrega a lista de destaques apenas uma vez quando o componente é montado.
 * 2. Integração: Consome a função `getPopularMangas` da camada de serviços (MangaDexApi).
 * 3. Gerenciamento de Estado: Armazena o array de mangás mais populares e controla o estado de 'loading'.
 * * RETORNO:
 * Objeto contendo o array 'mangas' e a flag de carregamento 'loading'.
 */

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