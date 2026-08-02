export function Navbarfin({ finalSite, info }) {
  return (
    <header className="header">
      <h2>{finalSite}</h2>
      <p>{info}</p>
      <nav>
        <a href="#">Home</a>
        <a href="#">Catálogo</a>
        <a href="#">Sobre nós</a>
      </nav>
    </header>
  );
}