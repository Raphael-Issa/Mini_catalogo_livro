// imports
import { useState, useEffect } from 'react';
import { getPopularMangas } from '../services/mangadex_api';

// Imports componentes da pasta 'componentes'
import { Navbar } from '../componentes/Navbar';
import { MangaCard } from '../componentes/MangaCard';

//import para css
import '../App.css';

//import link do react router dom
import { Link } from 'react-router-dom';


//inicio função
export function Home() {

  //use states
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  // ESTADO NOVO: guarda o índice do mangá sorteado
  const [indiceSorteado, setIndiceSorteado] = useState(0);

  //use effect
  useEffect(() => {

    //função dentro de uma outrafunção do effect para carregar dados
    async function carregarDados() {

      //try de verificação
      try {
        const dados = await getPopularMangas();
        setMangas(dados);

        // SORTEIO: Seleciona um índice aleatório entre os mangás retornados
        if (dados && dados.length > 0) {
          const totalMangas = Math.min(dados.length, 20); // Limita em até 20 itens
          const numeroAleatorio = Math.floor(Math.random() * totalMangas);
          setIndiceSorteado(numeroAleatorio);
        }
      } catch (erro) {
        console.error("Erro ao carregar:", erro);
      } finally {
        setLoading(false);
      }
    }

    //chamando a função
    carregarDados();

  }, []); //array assim, faz iniciar a função apenas uma vez


  if (loading) return <h2>Carregando mangá...</h2>; // verifica se a pagina carregou

  // Pega o mangá sorteado do array em vez de pegar fixo o primeiro [0]
  const mangaDestaque = mangas[indiceSorteado]; 
  
  if (!mangaDestaque) return <p>Nenhum mangá encontrado.</p>; 


  // --- TRATAMENTO SEGURO DO TÍTULO ---
  // Acessa os títulos sem risco de crashar caso venha nulo ou em outro formato
  const titulos = mangaDestaque?.attributes?.title || {};
  let titulo = "Título Indisponível";

  if (typeof titulos === 'string') {
    titulo = titulos;
  } else if (typeof titulos === 'object' && titulos !== null) {
    titulo = titulos.en || titulos['ja-ro'] || titulos['pt-br'] || Object.values(titulos)[0] || "Título Indisponível";
  }


  // --- TRATAMENTO SEGURO DA CAPA ---
  // Busca a capa correspondente AO MESMO MANGÁ SORTEADO
  const caparel = Array.isArray(mangaDestaque?.relationships)
    ? mangaDestaque.relationships.find(r => r.type === 'cover_art')
    : null;

  const nomeArquivo = caparel?.attributes?.fileName;

  // Garante que a foto só monta a URL se existir nome do arquivo
  const urlDaFoto = nomeArquivo 
    ? `https://uploads.mangadex.org/covers/${mangaDestaque.id}/${nomeArquivo}`
    : "https://via.placeholder.com/1200x600?text=Sem+Capa";





  return (
    <div className="home-container">
      {/* 1. Navbar única do topo */}
      <Navbar 
        tituloSite="Vortex Mangás"
        home="Home"
        cat="Catálogos"
        sobre="Saiba Mais"
      />





      {/* 2. Banner Principal (HERO) */}
      <main className="hero-banner">
        {/* A imagem do mangá fica aqui como fundo com opacidade */}
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${urlDaFoto})` }}
        />
        
        {/* Camada escura para dar leitura ao texto */}
        <div className="hero-overlay" />

        {/* Informações que ficam POR CIMA da imagem */}
        <div className="hero-content">
          <span className="badge">Destaques</span>
          <h1 className="hero-title">{titulo}</h1>
          <p className="hero-description">
            Sua porta de entrada para a melhor coleção de mangás e isekais selecionados.
          </p>

          <div className="hero-buttons">
            <Link to="/catalogos">
              <button className="btn btn-primary">Ver Catálogo</button>
            </Link>

            <Link to="/saiba">
              <button className="btn btn-secondary">Saiba Mais</button>
            </Link>
          </div>
        </div>
      </main>




      {/* 3. Rodapé simples */}
      <footer className="footer">
        <p>ISEKAI HUB © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );
}