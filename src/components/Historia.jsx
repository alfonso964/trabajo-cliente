/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import "../styles/Historia.css";

function Historia() {
  return (
    <section className="historia-section">
      <div className="historia-container">
        
        {/* BLOQUE 1: LOS ORÍGENES */}
        <div className="historia-row">
          <motion.div 
            className="historia-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="historia-tag">Desde 2010</span>
            <h2 className="historia-title">Nuestra <br/><span>Historia</span></h2>
            <p>
              Lo que empezó como un <strong>pequeño taller de barrio</strong> en las afueras de Madrid, ha crecido gracias al boca a boca de nuestros vecinos.
            </p>
            <p>
              No somos un concesionario de lujo, somos gente apasionada por la mecánica que sabe lo que significa cuidar un coche. Nuestra historia no se escribe con grandes eventos, sino con cada motor que vuelve a rugir y cada cliente que confía en nosotros para seguir haciendo kilómetros.
            </p>
          </motion.div>

          <motion.div 
            className="historia-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ 
              y: [0, -20, 0], 
            }}
            transition={{ 
              duration: 0.8,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            viewport={{ once: true }}
          >
            <div className="image-decoration"></div>
            <img 
              src="/imagenTaller.jpeg" 
              alt="Nuestro taller de barrio" 
              className="historia-img"
            />
          </motion.div>
        </div>

        {/* BLOQUE 2: LA FILOSOFÍA */}
        <div className="historia-row reverse">
          <motion.div 
            className="historia-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/imagenHistoria.avif" 
              alt="Mecánica real" 
              className="historia-img"
            />
          </motion.div>

          <motion.div 
            className="historia-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="historia-title">Trabajo <span>Bien Hecho</span></h2>
            <p>
              En Alfonso Motors entendemos que tu coche es fundamental para tu día a día. Por eso, nuestra filosofía se basa en la <strong>revisión a fondo</strong>: solo ponemos a la venta vehículos que nosotros mismos conduciríamos.
            </p>
            <p>
              Hoy seguimos mirando hacia adelante, adaptándonos a los nuevos tiempos y tecnologías, pero manteniendo siempre la esencia de ese taller de confianza donde una palabra y un apretón de manos valen más que cualquier contrato.
            </p>
            <div className="historia-stats">
              <div className="stat-item"><strong>15+</strong><span>Años</span></div>
              <div className="stat-item"><strong>1000+</strong><span>Clientes</span></div>
              <div className="stat-item"><strong>100%</strong><span>Esfuerzo</span></div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default Historia;