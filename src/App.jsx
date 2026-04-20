import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coleccion from './pages/Coleccion';
import Producto from './pages/Producto';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salas" element={<Coleccion tipo="salas" />} />
        <Route path="/camas" element={<Coleccion tipo="camas" />} />
        <Route path="/producto/:id" element={<Producto />} />
      </Routes>
    </BrowserRouter>
  );
}
