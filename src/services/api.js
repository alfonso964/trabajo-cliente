// services/api.js
const BASE_URL = "http://localhost:3001/coches";

// Para el listado de la Home
export const getCoches = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener la lista de coches");
  return await res.json();
};

// NUEVA: Para la ficha técnica del Detalle
export const getCocheById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("No se encontró el vehículo");
  return await res.json();
};

// Para el formulario de Vender
export const postCoche = async (nuevoCoche) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoCoche)
  });
  return await res.json();
};