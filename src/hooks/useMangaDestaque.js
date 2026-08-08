/**
 * HOOK: useMangaDestaque
 * * RESPONSABILIDADE:
 * Processar e formatar as informações do mangá de maior destaque (Hero Banner da Home).
 * * FUNCIONALIDADES:
 * 1. Reuso: Consome o hook `usePopularMangas` para obter a lista de mangás mais seguidos.
 * 2. Seleção: Define o primeiro item da lista (índice 0) como o mangá em destaque.
 * 3. Tratamento de Título: Aplica fallback por idioma (Inglês > Inglês Alternativo > Romanizado > Português > Qualquer outro).
 * 4. Tratamento de Capa: Constrói a URL completa da imagem procurando pelo relacionamento 'cover_art' no objeto da API.
 * * RETORNO:
 * Objeto com o mangá em destaque, título tratado, URL da capa formatada, a lista completa e o estado de carregamento.
 */

import { usePopularMangas } from './usePopularMangas';

export function useMangaDestaque() {
  const { mangas, loading } = usePopularMangas();

  // Pega sempre o primeiro mangá da lista (índice 0)
  const mangaDestaque = mangas?.[0] || null;

  // Tratamento do Título
  const attributes = mangaDestaque?.attributes;
  const titulos = attributes?.title || {};
  const altTitles = attributes?.altTitles || []; // Lista de títulos alternativos vinda da API
  
  let titulo = "Título Indisponível";

  if (typeof titulos === 'string') {
    titulo = titulos;
  } else if (typeof titulos === 'object' && titulos !== null) {
    // Procura por um título em inglês dentro do array de títulos alternativos
    const altTitleEn = altTitles.find(t => t && t.en)?.en;

    // Ordem de prioridade: 
    // 1. Inglês Principal -> 2. Inglês Alternativo -> 3. Romanizado -> 4. Português -> 5. Qualquer outro
    titulo = titulos.en || 
             altTitleEn || 
             titulos['ja-ro'] || 
             titulos['pt-br'] || 
             Object.values(titulos)[0] || 
             "Título Indisponível";
  }

  // Tratamento da Capa
  const caparel = Array.isArray(mangaDestaque?.relationships)
    ? mangaDestaque.relationships.find(r => r.type === 'cover_art')
    : null;

  const nomeArquivo = caparel?.attributes?.fileName;

  const urlDaFoto = (mangaDestaque && nomeArquivo)
    ? `https://uploads.mangadex.org/covers/${mangaDestaque.id}/${nomeArquivo}`
    : "https://via.placeholder.com/1200x600?text=Sem+Capa";

  return {
    mangas,
    mangaDestaque,
    titulo,
    urlDaFoto,
    loading
  };
}