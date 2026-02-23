import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCoche.css";
import { useFavoritos } from "../context/FavoritosContext";
import { toast } from 'react-toastify';

function TarjetaCoche({ coche }) {
  const navegar = useNavigate();
  const { favoritos, toggleFavorito } = useFavoritos(); //Trae la lista actual de favoritos y para cambiarla
  const esFavorito = favoritos.some((fav) => fav.id === coche.id);// Comprueba si el coche de esta tarjeta ya existe en la lista global de favoritos comparando sus IDs

  const manejarClickDetalles = () => {
    navegar(`/coche/${coche.id}`); //Manda al usuario a la pagina especifica de detalles segun el id del coche
  };

  const manejarFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito(coche); // Llama a la función del contexto para actualizar la lista global
    
    if (!esFavorito) {
      toast.success(`¡Se ha añadido a favoritos !`);
    } else {
      toast.info(`Eliminado de favoritos`);
    }
  };

  return (
    <div className="tarjeta-coche relative">
      <div className="imagen-contenedor" style={{ position: 'relative' }}>
        <img src={coche.imagen} alt={coche.modelo} className="imagen-coche" />
        
        <button 
          className="swiper-no-swiping" // Clase para el Swiper
          onClick={manejarFavorito}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 9999, // Por encima de todo
            cursor: 'pointer',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            pointerEvents: 'auto' 
          }}
          title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {esFavorito ? "❤️" : "🤍"}
        </button>
      </div>
      
      <div className="info-contenedor">
        <span className="categoria-tag">{coche.categoria}</span>
        <h2 className="titulo-coche">{coche.marca} {coche.modelo}</h2>
        <p className="precio-coche">{coche.precio.toLocaleString()} €</p>
        
        <button className="boton-detalle" onClick={manejarClickDetalles}>
          Ver detalles
        </button>
      </div>
    </div>
  );
}

export default TarjetaCoche;