import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar'
import Home from './pages/Home'
import Vender from './pages/Vender'
import Contacto from './pages/Contacto'
import DetalleCoche from './pages/DetalleCoche';
import { FavoritosProvider } from './context/FavoritosContext';


function App() {
  return (
    <FavoritosProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vender" element={<Vender />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/coche/:id" element={<DetalleCoche />} />
        </Routes>
      </BrowserRouter>
    </FavoritosProvider>
    
  )
}

export default App
