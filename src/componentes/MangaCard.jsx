// src/componentes/MangaCard.jsx
export function MangaCard({ imagemUrl, titulo }) {
  return (
    <div className="imagemTitulo">
      <img src={imagemUrl} alt={titulo}/>
      <h2>Titulo</h2>
      <p>informações aqui</p>
      <button>Catalogo</button>
      <button>Sobre nós</button>
    </div>
  );
}