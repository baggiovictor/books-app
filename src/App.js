import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './core/components/Banner/Banner';
import Alunos from './pages/Alunos';
import Livros from './pages/Livros';
import Emprestimos from './pages/Emprestimos';

function App() {
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Alunos />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
