/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css"; 
import { motion } from "framer-motion";

function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        <div className="nav-logo">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <motion.img 
              src="/logoCoche.png" 
              alt="Logo" 
              /* Animación de entrada: Cae desde arriba con rebote */
              initial={{ y: -100, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", // Tipo de movimiento con rebote
                stiffness: 260, // Rigidez del muelle
                damping: 20,    // Amortiguación (cuánto tarda en pararse)
                delay: 0.2 
              }}
              /* Animación de Hover: Se hace grande y da un giro de 360 grados */
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                transition: { duration: 0.8 } 
              }}
              whileTap={{ scale: 0.8 }}
            />
          </NavLink>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className="nav-item">Inicio</NavLink>
          <NavLink to="/favoritos" className="nav-item">Favoritos</NavLink>
          <NavLink to="/vender" className="nav-item">Vender</NavLink>
          <NavLink to="/contacto" className="nav-item">Contacto</NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;