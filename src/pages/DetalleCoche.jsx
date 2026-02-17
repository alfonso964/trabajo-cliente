import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DetalleCoche.css";
import { useFavoritos } from "../context/FavoritosContext";

function DetalleCoche() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [coche, setCoche] = useState(null);

  // 2. Usamos el contexto para sacar la lista y la función de añadir/quitar
  const { favoritos, toggleFavorito } = useFavoritos();

  useEffect(() => {
    fetch(`http://localhost:3001/coches/${id}`)
      .then((res) => res.json())
      .then((data) => setCoche(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  // 3. Comprobamos si este coche ya está guardado
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
              <strong>Seguridad:</strong> {coche.valoracionSeguridad} / 5 ⭐
            </p>
          </div>

          {/* 4. BOTÓN DE FAVORITOS (Usando clases básicas para que no rompa tu diseño) */}
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