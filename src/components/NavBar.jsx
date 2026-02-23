/* eslint-disable no-unused-vars */
import { useState } from "react"; // Hook para el estado
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css"; 
import { motion } from "framer-motion"; 

function Navbar() {
  // 1. Estado para controlar si el menú móvil está abierto o cerrado
  const [estaAbierto, setEstaAbierto] = useState(false); 

  // 2. Función para alternar el estado (si está abierto lo cierra, y viceversa)
  const cambiarMenu = () => setEstaAbierto(!estaAbierto);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        <div className="nav-logo">
          <NavLink to="/" className="flex flex-row items-center gap-3 no-underline">
            <motion.img 
              src="/logoCoche.png" 
              alt="Logo" 
              initial={{ y: -100, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.8 } }}
              whileTap={{ scale: 0.8 }}
              className="logo-img"
            />
            
            <span className="navbar-title">
              Alfonso <span className="font-black">Motors</span>
            </span>
          </NavLink>
        </div>

        {/* 3.Menu hmaburguesa */}
        <button className="menu-toggle" onClick={cambiarMenu}>
          <div className={`hamburger ${estaAbierto ? "open" : ""}`}></div>
        </button>

        {/* 4. ENLACES: Se les añade la clase "open" si estaAbierto es true */}
        <nav className={`nav-links ${estaAbierto ? "open" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={() => setEstaAbierto(false)}>Inicio</NavLink>
          <NavLink to="/favoritos" className="nav-item" onClick={() => setEstaAbierto(false)}>Favoritos</NavLink>
          <NavLink to="/vender" className="nav-item" onClick={() => setEstaAbierto(false)}>Vender</NavLink>
          <NavLink to="/contacto" className="nav-item" onClick={() => setEstaAbierto(false)}>Contacto</NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;