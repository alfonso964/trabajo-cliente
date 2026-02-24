import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h2 className="footer-logo">ALFONSO <span>MOTORS</span></h2>
          <p>Líderes en la importación de vehículos de alta gama. Pasión por la ingeniería desde 2010.</p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/vender">Vender</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
            <li><NavLink to="/favoritos">Favoritos</NavLink></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">X</a>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Alfonso Motors. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;