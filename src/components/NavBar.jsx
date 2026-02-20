/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css"; 
import { motion } from "framer-motion";

function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        <div className="nav-logo">
          {/* Añadimos flex-row para asegurar que el título esté a la derecha */}
          <NavLink to="/" className="flex flex-row items-center gap-3 no-underline">
            <motion.img 
              src="/logoCoche.png" 
              alt="Logo" 
              initial={{ y: -100, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,    
                delay: 0.2 
              }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                transition: { duration: 0.8 } 
              }}
              whileTap={{ scale: 0.8 }}
              className="logo-img"
            />
            
            {/* TÍTULO A LA DERECHA */}
            <span className="navbar-title">
              Alfonso <span className="font-black">Motors</span>
            </span>
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