import { useState, useEffect } from 'react';
import { usePopularMangas } from './usePopularMangas';

export function useMangaDestaque() {
  const { mangas, loading } = usePopularMangas();
  const [indiceSorteado, setIndiceSorteado] = useState(0);

  useEffect(() => {
    if (mangas && mangas.length > 0) {
      const totalMangas = Math.min(mangas.length, 100);
      const numeroAleatorio = Math.floor(Math.random() * totalMangas);
      setIndiceSorteado(numeroAleatorio);
    }
  }, [mangas]);

  const mangaDestaque = mangas[indiceSorteado];

  // Tratamento do Título
  const titulos = mangaDestaque?.attributes?.title || {};
  let titulo = "Título Indisponível";

  if (typeof titulos === 'string') {
    titulo = titulos;
  } else if (typeof titulos === 'object' && titulos !== null) {
    titulo = titulos.en || titulos['ja-ro'] || titulos['pt-br'] || Object.values(titulos)[0] || "Título Indisponível";
  }

  // Tratamento da Capa
  const caparel = Array.isArray(mangaDestaque?.relationships)
    ? mangaDestaque.relationships.find(r => r.type === 'cover_art')
    : null;

  const nomeArquivo = caparel?.attributes?.fileName;

  const urlDaFoto = nomeArquivo 
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