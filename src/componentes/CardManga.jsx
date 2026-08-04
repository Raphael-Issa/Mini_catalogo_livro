import { Link } from 'react-router-dom';

export function CardManga({ manga }) {
  const attributes = manga?.attributes;
  const titulos = attributes?.title || {};
  const altTitles = attributes?.altTitles || [];

  // Procura por um título em inglês no array de títulos alternativos
  const altEnglish = altTitles.find((item) => item && item.en)?.en;

  // Prioridades: 
  // 1. Inglês Principal (title.en)
  // 2. Inglês Alternativo (altTitles)
  // 3. Romanizado (ja-ro / ko-ro)
  // 4. Português (pt-br)
  // 5. Primeiro disponível caso não tenha nenhum dos acima
  const titulo = typeof titulos === 'string'
    ? titulos
    : (
        titulos.en || 
        altEnglish || 
        titulos['ja-ro'] || 
        titulos['ko-ro'] || 
        titulos['pt-br'] || 
        Object.values(titulos)[0] || 
        "Sem título"
      );

  const caparel = manga?.relationships?.find(r => r.type === 'cover_art');
  const nomeArquivo = caparel?.attributes?.fileName;
  const urlCapa = nomeArquivo 
    ? `https://uploads.mangadex.org/covers/${manga.id}/${nomeArquivo}`
    : "https://via.placeholder.com/200x300?text=Sem+Capa";

  return (
    <Link to={`/manga/${manga.id}`} style={{ textDecoration: 'none' }}>
      <div className="manga-card">
        <img src={urlCapa} alt={titulo} className="manga-card-img" />
        <h3 className="manga-card-title">{titulo}</h3>
      </div>
    </Link>
  );
}