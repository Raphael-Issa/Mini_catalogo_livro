export function Descricao({ titulo, info }) {
  return (
    <div className="descricao">
      <h2>{titulo}</h2>
      <p>{info}</p>
    </div>
  );
}