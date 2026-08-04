import { Navbar } from '../componentes/Navbar'; 
import '../App.css';

export function Saiba() {
  return (
    <div className="home-container">
      <Navbar 
        home="Home"
        cat="Catálogos"
        sobre="Saiba Mais"
      />

      <main className="centro">
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', lineHeight: '1.6' }}>
          <h1 style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', fontSize: '2rem' }}>
            Sobre o Vortex Mangás
          </h1>

          <p style={{ fontSize: '1.05rem', marginBottom: '1.2rem', color: 'var(--text-muted)' }}>
            O <strong>Vortex Mangás</strong> é uma aplicação React desenvolvida para testes, estudo de frontend e consumo de APIs REST. O objetivo é criar uma interface limpa e responsiva para consulta de obras, capas e sinopses.
          </p>

          <h2 style={{ color: 'var(--accent-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.4rem' }}>
            🛠️ Arquitetura e Integração
          </h2>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            A aplicação consome a API pública do <strong>MangaDex</strong> para buscar as informações em tempo real. Toda a lógica de estados, paginação e buscas dinâmicas é gerenciada por <em>Custom Hooks</em> em React, mantendo a interface leve e dividida em componentes independentes.
          </p>

          <h2 style={{ color: 'var(--accent-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.4rem' }}>
            📱 Empacotamento Mobile (Capacitor)
          </h2>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            Este projeto foi estruturado para ser compilado em um APK Android utilizando o <strong>Capacitor</strong>. A ideia é transformar a aplicação web em um app mobile nativo para uso pessoal e testes de usabilidade em telas menores.
          </p>

          <h2 style={{ color: 'var(--accent-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.4rem' }}>
            ⚠️ Limitações de API e Distribuição
          </h2>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            Este projeto <strong>não será publicado comercialmente nem disponibilizado em lojas de aplicativos</strong> (como a Play Store). Existem alguns motivos principais para isso:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Termos da API:</strong> A API do MangaDex possui limites de requisições (rate limits) e regras estritas sobre o uso de dados para aplicações comerciais ou de grande escala.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Direitos Autorais:</strong> Todo o conteúdo, títulos e imagens de capas pertencem aos seus respetivos autores e editoras. 
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Foco Educacional:</strong> O projeto existe exclusivamente com o propósito de portfólio, aprendizado de rotas, consumo de dados assíncronos e testes com Capacitor.
            </li>
          </ul>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid rgba(102, 252, 241, 0.2)' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              VORTEX MANGÁS © 2026 — Projeto sem fins lucrativos.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>VORTEX MANGÁS © 2026 - Dados e capas fornecidos por MangaDex. Projeto não comercial.</p>
      </footer>
    </div>
  );
}