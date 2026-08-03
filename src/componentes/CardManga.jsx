import { Link } from 'react-router-dom';

export function CardManga({ manga }) {
  const titulos = manga?.attributes?.title || {};
  const titulo = typeof titulos === 'string' 
    ? titulos 
    : titulos.en || titulos['ja-ro'] || titulos['pt-br'] || Object.values(titulos)[0] || "Sem título";

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