import { useFavoritos } from '../context/FavoritosContext';
import TarjetaCoche from '../components/TarjetaCoche';
import "../styles/Favoritos.css";

function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <div className="favoritos-container">
      <h2 className="titulo-seccion">Mis Vehículos <span className="rojo">Favoritos</span></h2>
      
      {favoritos.length === 0 ? (
        <p className="mensaje-vacio">Aún no tienes coches guardados.</p>
      ) : (
        <div className="favoritos-grid">
          {favoritos.map(coche => (
            <TarjetaCoche key={coche.id} coche={coche} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;