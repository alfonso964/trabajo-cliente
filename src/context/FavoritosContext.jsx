/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const FavoritosContext = createContext();

// 2. Creamos el Proveedor (el que envuelve la app)
export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  // Función para añadir o quitar de favoritos
  const toggleFavorito = (coche) => {
    const existe = favoritos.find(fav => fav.id === coche.id);
    if (existe) {
      setFavoritos(favoritos.filter(fav => fav.id !== coche.id));
    } else {
      setFavoritos([...favoritos, coche]);
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

// 3. Hook personalizado para usarlo más fácil
export const useFavoritos = () => useContext(FavoritosContext);