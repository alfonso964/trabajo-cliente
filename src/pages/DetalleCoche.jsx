import "../styles/DetalleCoche.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCocheById } from "../services/api"; // Importación del servicio
import { useFavoritos } from "../context/FavoritosContext";

function DetalleCoche() {
  const { id } = useParams(); //para coger el id que se pasa por la url
  const navegar = useNavigate(); //para poder movernos por las paginas
  const [coche, setCoche] = useState(null);
  const { favoritos, toggleFavorito } = useFavoritos();// Traemos la lista de favoritos y la función para añadir/quitar.

  useEffect(() => {
    // pedimos el coche que tenga ese id
    getCocheById(id)
      .then((data) => setCoche(data))
      .catch((err) => console.error("Error al cargar el detalle:", err));
  }, [id]);

  // Revisa si algún coche de favoritos tiene el mismo ID que el coche actual.
  const esFavorito = coche && favoritos.some((fav) => fav.id === coche.id);

  if (!coche) return <p className="loading">Cargando ficha técnica...</p>;

  return (
    <div className="detalle-container">
      <button onClick={() => navegar(-1)} className="btn-volver">
        ← Volver
      </button>

      <div className="detalle-card">
        <img src={coche.imagen} alt={coche.modelo} />

        <div className="detalle-info">
          <h1>{coche.marca} {coche.modelo}</h1>
          <span className="badge">{coche.categoria}</span>

          <p className="descripcion">{coche.descripcion}</p>

          <div className="specs">
            <p><strong>Motor:</strong> {coche.motor}</p>
            <p><strong>Precio:</strong> {coche.precio.toLocaleString()} €</p>
            <p className="seguridad">
              <strong>Seguridad:</strong> {coche.seguridad} ⭐
            </p>
          </div>

          <button 
            onClick={() => toggleFavorito(coche)}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: esFavorito ? '#e63946' : '#f0f0f0',
              color: esFavorito ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            {esFavorito ? "❤️ Quitar de Favoritos" : "🤍 Guardar en Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleCoche;