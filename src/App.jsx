import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./telas/Home.jsx";
import { Saiba } from "./telas/Saiba.jsx";
import { Catalogos } from './telas/Catalogos.jsx';
import { DetalhesManga } from './telas/DetalhesManga.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogos" element={<Catalogos />} />
        <Route path="/saiba" element={<Saiba />} />
        {/* Nova Rota Dinâmica */}
        <Route path="/manga/:id" element={<DetalhesManga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;