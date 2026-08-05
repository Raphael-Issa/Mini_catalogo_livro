# 🌀 Vortex Mangás

O **Vortex Mangás** é uma Single Page Application (SPA) moderna para exploração e consulta de catálogos de mangás. O projeto consome a API do MangaDex, oferecendo busca em tempo real, navegação dinâmica, paginação sincronizada na URL e suporte para compilação nativa em Android.

---

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)** (Vite)
- **[React Router DOM](https://reactrouter.com/)** (Roteamento SPA)
- **[Capacitor](https://capacitorjs.com/)** (Empacotamento Nativo Android)
- **[MangaDex API](https://api.mangadex.org/)** (Fonte de dados do catálogo)
- **CSS3** (Estilização responsiva e tema customizado)

---

## 📌 Principais Funcionalidades

- **Navegação SPA:** Transições de tela fluidas e sem recarregamento de página.
- **Destaques e Populares:** Exibição dos 100 mangás mais seguidos na Home e banner com obra em destaque.
- **Catálogo Dinâmico:** Busca por texto e paginação.
- **Parâmetros na URL:** Estado da busca e página atual persistem na URL (`/catalogos?busca=one%20piece&pagina=2`), permitindo compartilhamento de links diretos.
- **Detalhes da Obra:** Rota dinâmica (`/manga/:id`) com sinopse, capa, informações detalhadas e histórico de navegação nativo do navegador.
- **Suporte Mobile:** Configurado via Capacitor para execução nativa em dispositivos Android.

---

## 🏗️ Arquitetura e Estrutura do Projeto

### 🛣️ Roteamento (`src/App.jsx`)
A aplicação utiliza o `BrowserRouter` com as seguintes rotas mapeadas:

| Rota | Tela | Descrição |
| :--- | :--- | :--- |
| `/` | `Home` | Página inicial com destaques e obras populares |
| `/catalogos` | `Catalogos` | Busca geral de mangás e paginação |
| `/saiba` | `Saiba` | Informações sobre a plataforma |
| `/manga/:id` | `DetalhesManga` | Informações detalhadas de um mangá específico (via UUID) |

---

### 🎣 Hooks Customizados (`src/hooks/`)
A lógica de negócios e as requisições estão segregadas em hooks especializados:

- `usePopularMangas.js`: Busca e gerencia a lista dos mangás mais populares.
- `useMangaDestaque.js`: Processa o primeiro item da lista popular para exibição no banner principal.
- `useMangaSearch.js`: Gerencia a busca por texto, números de páginas e estados de carregamento.
- `useMangaDetails.js`: Consome os dados específicos de uma obra a partir do UUID da URL.
- `useCatalogParams.js`: Sincroniza os parâmetros de consulta (`busca`, `pagina`) com a URL e trata o rolamento suave (*scroll*) ao trocar de página.

---

### 🎨 Design e Estilização
- `src/index.css`: Reset global de CSS e estilos base.
- `src/App.css`: Definição do tema escuro (fundo escuro, cards azulados e acentos em cor ciano), gerenciamento da grade responsiva e adaptação para dispositivos móveis.

---

## 💻 Como Executar o Projeto

### Pré-requisitos
- **Recomendação: Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Android Studio** (apenas se for rodar/compilar a versão mobile Android)

### Guia Único de Instalação, Execução e Build Mobile

```bash
# 1. Clone o repositório
git clone [https://github.com/SEU-USUARIO/vortex-mangas.git](https://github.com/SEU-USUARIO/vortex-mangas.git)

# 2. Acesse a pasta do projeto
cd vortex-mangas

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento na web
npm run dev
# Acesse no seu navegador através do link: http://localhost:5173

# -------------------------------------------------------------
# ETAPAS ADICIONAIS PARA COMPILAÇÃO / EXECUÇÃO NO ANDROID:
# -------------------------------------------------------------

# 5. Gere o pacote de produção da aplicação web
npm run build

# 6. Sincronize os arquivos compilados (dist) com o Capacitor
npx cap sync

# 7. Abra o projeto nativo no Android Studio para rodar em um emulador ou dispositivo físico
npx cap open android
