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



  //use effect
  useEffect(() => {


    //função dentro de uma outrafunção do effect para carregar dados
    async function carregarDados() {


      //try de verificação
      try {
        const dados = await getPopularMangas();
        setMangas(dados);
      } catch (erro) {
        console.error("Erro ao carregar:", erro);
      } finally {
        setLoading(false);
      }
    }


    //chamando a função
    carregarDados();


  }, []); //array assim, faz iniciar a função apenas uma vez




  if (loading) return <h2>Carregando mangá...</h2>; // verifica se a pagina carregou, se sim, diz false, se não, diz true
  const primeiroManga = mangas[0]; // pega o primeiro manga para colocar na tela
  if (!primeiroManga) return <p>Nenhum mangá encontrado.</p>;  // Se NÃO existir (verdadeiro): * A função para e exibe na tela o parágrafo



  // Extraímos apenas as variáveis que precisamos passar para o componente
  const titulo = primeiroManga.attributes.title.en || Object.values(primeiroManga.attributes.title)[0]; // retorna o titulo em en, ingles, ou sen tiver, retorna o primeiro que achar do idioma
  const caparel = primeiroManga.relationships.find(r => r.type === 'cover_art'); // percorre uma lista de relations para achar o type cover...
  const nomeArquivo = caparel?.attributes?.fileName; // retorna indefinido caso n tenha a capa
  const urlDaFoto = `https://uploads.mangadex.org/covers/${primeiroManga.id}/${nomeArquivo}`; // pega o link da foto do manga, que é preenchido por variaveis

  return (
    <div className="home-container">
      {/* 1. Navbar única do topo */}
      <Navbar 
        tituloSite="Isekai Hub"
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
          <span className="badge">Destaque da Semana</span>
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