  const BASE_URL = 'https://api.mangadex.org';

  // Busca os 20 mangás mais populares/recentes sem precisar de busca por texto
  export async function getPopularMangas() {
    try {
      const response = await fetch(
        `${BASE_URL}/manga?limit=100&includes[]=cover_art&order[followedCount]=desc`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar lista de mangás');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Explicação sobre o processo desse service - A url base completa o resto do link, e cada parte do link faz algo.
  // Sobre o /manga, referece a o objeto mangá, ?limit=100, referece ao limite de mangas por requisição que será puxado.
  // O & aparentemente é para concatenar outros pedidos, como includes[]=cover_art, que serve para puxar no mesmo objeto manga, a imagem da capa dele.
  // E o order[followedCount]=desc`, referece a colocar em ordem do manga mais seguido para o menos seguido.

  // Dps faz uma fetch para response, uma verificação se puxou direito, e aloca a response.json em uma const data.









// --- Funções Auxiliares (Não precisam do export se só forem usadas aqui) ---
function formatTitle(titleObj) {
  if (!titleObj) return "Sem título";
  if (typeof titleObj === 'string') return titleObj;
  return titleObj['pt-br'] || titleObj.en || titleObj['ja-ro'] || Object.values(titleObj)[0] || "Sem título";
  //responsabilidade de formatar um titulo
}

function cleanDescription(descObj) {
  const raw = descObj?.['pt-br'] || descObj?.pt || descObj?.en || "Sem descrição disponível.";
  return raw.split('---')[0].replace(/\[(.*?)\]\((.*?)\)/g, '$1').trim();
 //responsabilidade de puxar uma descrição em uma lingua e limpar o texto dela
}

function getCoverUrl(mangaId, relationships) {
  const cover = relationships?.find(r => r.type === 'cover_art');
  const fileName = cover?.attributes?.fileName;
  return fileName 
    ? `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`
    : "https://via.placeholder.com/300x450?text=Sem+Capa";
    //rersponsabilidade de pegar a capa
}



// --- Função da API Exportada ---
export async function getMangaDetailsById(id) {
  const response = await fetch(`${BASE_URL}/manga/${id}?includes[]=cover_art`);
  
  if (!response.ok) {
    throw new Error('Falha ao carregar detalhes.');
  }

  const result = await response.json();
  const mangaData = result.data;

  // Já entrega os dados mastigados e formatados
  return {
    manga: mangaData,
    titulo: formatTitle(mangaData.attributes?.title),
    descricao: cleanDescription(mangaData.attributes?.description),
    urlCapa: getCoverUrl(mangaData.id, mangaData.relationships)
  };
 // responsabilidade de puxar os dados do manga, capa, etc e enviar para useMangaDetails
}



// Sobre o formatTitle, ele é uma função para buscar titulos em determinadas linguagens, ou retornar sem titulo, caso não aja.
// Sobre o cleanDescription, ele é uma função para limpar uma descrição de um mangá, já que a descrição vem cheio de coisa inutil.
// Sobre o getCoverUrl, ele é uma função basicamente feita para completar um link de uma capa usando manga id e relationships
// Sobre o getMangaDetailsById(id), ele é uma função que puxa os dados do manga e ademais, mas usando a base url e o id para não puxar qualquer manga. 









const LIMIT = 20; // Definição do limite por página

// --- Função Auxiliar Interna para Ordenação ---
function sortMangasByRelevance(results, query) {
  if (!query.trim()) return results;

  const cleanQuery = query.trim().toLowerCase();

  return [...results].sort((a, b) => {
    const titleA = (a.attributes?.title?.en || Object.values(a.attributes?.title || {})[0] || '').toLowerCase();
    const titleB = (b.attributes?.title?.en || Object.values(b.attributes?.title || {})[0] || '').toLowerCase();

    const getScore = (title) => {
      if (title === cleanQuery) return 3;       // Correspondência exata
      if (title.startsWith(cleanQuery)) return 2; // Começa com o termo
      return 1;                                  // Contém o termo
    };

    const scoreA = getScore(titleA);
    const scoreB = getScore(titleB);

    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }

    return titleA.length - titleB.length;
  });
}


// Atualização da sua searchMangas
export async function searchMangas(query = '', page = 1) {
  const offset = (page - 1) * LIMIT;
  let url = `${BASE_URL}/manga?limit=${LIMIT}&offset=${offset}&includes[]=cover_art&order[relevance]=desc`;

  if (query) {
    url += `&title=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar lista de mangás');

  const data = await response.json();
  const rawResults = data.data || [];
  const sortedResults = sortMangasByRelevance(rawResults, query);

  // --- NOVO: Puxa as notas de todos os mangás retornados de uma só vez ---
  const mangaIds = sortedResults.map(manga => manga.id);
  const statistics = await getMangasRatings(mangaIds);

  // Anexa a nota calculada dentro de cada objeto 'manga'
  const mangasComNotas = sortedResults.map(manga => {
    const ratingObj = statistics[manga.id]?.rating;
    const average = ratingObj?.average;
    
    return {
      ...manga,
      nota: average ? average.toFixed(1) : 'N/A'
    };
  });

  return {
    mangas: mangasComNotas,
    totalPages: Math.ceil((data.total || 0) / LIMIT)
  };
}


// Sobre a searchMangas: const offset = (page - 1) * LIMIT: Calcula qual "página" de dados pedir. Se page = 1, o offset é 0. Se page = 2, pula 20 itens (offset = 20).
// encodeURIComponent(query): Protege a URL contra caracteres especiais ou espaços digitados pelo usuário (ex: transforma espaço em %20).
// fetch(url): Dispara a requisição HTTP.
// Math.ceil(totalItems / LIMIT): A API informa quantos mangás existem no total (ex: 95). Dividindo por 20 (limite) e arredondando para cima (Math.ceil), 
// descobrimos que teremos 5 páginas no catálogo.
//return { mangas, totalPages }: Entrega o resultado tratado em um objeto limpo.




// O que faz a sortMangasByRelevance(results, query): Quando o usuário pesquisa por "Naruto", a API do MangaDex pode devolver coisas como "Naruto Gaiden" ou 
// spin-offs antes do "Naruto" principal. Essa função lê os títulos retornados, aplica uma pontuação (score) para dar 
// prioridade ao nome exato e reordena a lista.




// Função auxiliar para buscar notas em lote de uma lista de IDs
async function getMangasRatings(mangaIds) {
  if (!mangaIds || mangaIds.length === 0) return {};

  try {
    // Monta a URL: /statistics/manga?manga[]=id1&manga[]=id2...
    const queryParams = mangaIds.map(id => `manga[]=${id}`).join('&');
    const response = await fetch(`${BASE_URL}/statistics/manga?${queryParams}`);
    
    if (!response.ok) return {};

    const data = await response.json();
    return data.statistics || {};
  } catch (error) {
    console.error("Erro ao buscar notas em lote:", error);
    return {};
  }
}













