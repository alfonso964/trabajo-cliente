import { useNavigate } from "react-router-dom";
import "../styles/TarjetaCoche.css";
// 1. Importamos el hook que conecta con el contexto
import { useFavoritos } from "../context/FavoritosContext";

function TarjetaCoche({ coche }) {
  const navegar = useNavigate();
  
  // 2. Extraemos lo que necesitamos del contexto global
  const { favoritos, toggleFavorito } = useFavoritos();

  // 3. Comprobamos si este coche específico ya está en la lista de favoritos
  const esFavorito = favoritos.some((fav) => fav.id === coche.id);

  const manejarClickDetalles = () => {
    navegar(`/coche/${coche.id}`);
  };

  return (
    <div className="tarjeta-coche relative">
      <div className="imagen-contenedor">
        <img src={coche.imagen} alt={coche.modelo} className="imagen-coche" />
        
        {/* 4. Botón de favoritos sobre la imagen */}
        <button 
          className={`absolute top-2 right-2 text-2xl cursor-pointer transition-transform hover:scale-120 z-10`}
          onClick={() => toggleFavorito(coche)}
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