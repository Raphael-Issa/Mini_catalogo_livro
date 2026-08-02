import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./telas/Home.jsx";
import { Saiba } from "./telas/Saiba.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da tela inicial */}
        <Route path="/" element={<Home />} />

        {/* Rota temporária para o catálogo não quebrar a página */}
        <Route path="/catalogos" element={<Home />} />

        {/* Rota da tela Saiba Mais */}
        <Route path="/saiba" element={<Saiba />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;