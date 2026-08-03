import { useState, useEffect } from 'react';

// Funções utilitárias privadas para tratamento de dados
function formatTitle(titleObj) {
  if (!titleObj) return "Sem título";
  if (typeof titleObj === 'string') return titleObj;
  return titleObj['pt-br'] || titleObj.en || titleObj['ja-ro'] || Object.values(titleObj)[0] || "Sem título";
}

function cleanDescription(descObj) {
  const raw = descObj?.['pt-br'] || descObj?.pt || descObj?.en || "Sem descrição disponível.";
  return raw.split('---')[0].replace(/\[(.*?)\]\((.*?)\)/g, '$1').trim();
}

function getCoverUrl(mangaId, relationships) {
  const cover = relationships?.find(r => r.type === 'cover_art');
  const fileName = cover?.attributes?.fileName;
  return fileName 
    ? `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`
    : "https://via.placeholder.com/300x450?text=Sem+Capa";
}

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
        
        const response = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`);
        if (!response.ok) throw new Error('Falha ao carregar detalhes.');

        const result = await response.json();
        const mangaData = result.data;

        // Trata os dados antes de salvar no estado
        setData({
          manga: mangaData,
          titulo: formatTitle(mangaData.attributes?.title),
          descricao: cleanDescription(mangaData.attributes?.description),
          urlCapa: getCoverUrl(mangaData.id, mangaData.relationships)
        });
      } catch (err) {
        console.error("Erro no useMangaDetails:", err);
        setError('Erro ao carregar os detalhes do mangá.');
      } finally {
        setLoading(false);
      }
    }

    fetchMangaDetails();
  }, [id]);

  return { ...data, loading, error };
}