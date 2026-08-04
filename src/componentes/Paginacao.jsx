// Altere de 100 para 500
const MAX_PAGINAS = 500; 

export function Paginacao({ pagina, totalPagesAPI = 1, setPagina }) {
  // Agora calcula o limite real até 500 páginas!
  const totalPages = Math.min(totalPagesAPI || 1, MAX_PAGINAS);

  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;
  let startPage = Math.max(1, pagina - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="paginacao">
      <button disabled={pagina <= 1} onClick={() => setPagina(1, totalPages)}>
        ««
      </button>
      <button disabled={pagina <= 1} onClick={() => setPagina((p) => p - 1, totalPages)}>
        ‹
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => setPagina(1, totalPages)}>1</button>
          {startPage > 2 && <span className="reticencias">...</span>}
        </>
      )}

      {pages.map((num) => (
        <button
          key={num}
          className={pagina === num ? 'ativo' : ''}
          onClick={() => setPagina(num, totalPages)}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="reticencias">...</span>}
          <button onClick={() => setPagina(totalPages, totalPages)}>{totalPages}</button>
        </>
      )}

      <button disabled={pagina >= totalPages} onClick={() => setPagina((p) => p + 1, totalPages)}>
        ›
      </button>
      <button disabled={pagina >= totalPages} onClick={() => setPagina(totalPages, totalPages)}>
        »»
      </button>
    </div>
  );
}