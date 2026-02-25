/* eslint-disable react-hooks/set-state-in-effect */
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/Catalogo.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import TarjetaCoche from "./TarjetaCoche";
import { getCoches } from "../services/api";

function Catalogo() {
  const [coches, setCoches] = useState([]); //Donde almacenamos todos los coches
  const [filtrados, setFiltrados] = useState([]); //Almacenamos los coches una vez filtrados
  const [cargando, setCargando] = useState(true); //Para mostrar un mensaje con cargando mientras carga la api

  const [busqueda, setBusqueda] = useState(""); //Este es el texto que escribe el usuario
  const [categoria, setCategoria] = useState(""); //Guarda la categoria que se elige en el select
  const [orden, setOrden] = useState(""); //Guarda el orden que se elige en el select

  useEffect(() => {
    getCoches()
      .then((data) => {
        setCoches(data);
        setFiltrados(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    //Creamos resultado para guardar los resultados que se pasen en el filtro
    let resultado = coches.filter((c) => {
      const nombreCoche = (c.marca + " " + c.modelo).toLowerCase();
      const terminoBusqueda = busqueda.toLowerCase().trim();
      const coincideBusqueda = nombreCoche.includes(terminoBusqueda); //Comprobamos si el nombre que que ha escrito el usuario coincide con algun coche
      const coincideCategoria = categoria === "" || c.categoria === categoria; //Si el usuario no lo elige categoria pasa el filtro , y si la elige tambien lo pasa
      return coincideBusqueda && coincideCategoria;
    });

    const limpiarPrecio = (p) => Number(String(p).replace(/[^0-9.-]+/g, "")); //Para eliminar todo lo que no sea necesario

    if (orden === "barato") {
      resultado.sort((a, b) => limpiarPrecio(a.precio) - limpiarPrecio(b.precio));
    } else if (orden === "caro") {
      resultado.sort((a, b) => limpiarPrecio(b.precio) - limpiarPrecio(a.precio));
    }

    setFiltrados(resultado);
  }, [busqueda, categoria, orden, coches]); //Si alguno cambia se vuelve a ejecutar el filtro

  const handleMouseEnter = (e) => { e.target.style.transform = "scale(1.03)"; };
  const handleMouseLeave = (e) => { e.target.style.transform = "scale(1)"; };

  if (cargando) return <p className="loading-text">Cargando galería...</p>;

  return (
    <section className="catalogo-container py-12">
      <h1 className="catalogo-titulo italic tracking-tighter">
        Explora nuestros <span className="text-red-600">modelos</span>
      </h1>

      <div className="filtros-wrapper">
        <input
          type="text"
          placeholder="Busca modelo (Ej: Seat)..."
          className="search-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <select className="filter-select" onChange={(e) => setCategoria(e.target.value)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <option value="">Todas las categorías</option>
          <option value="SUV">SUV</option>
          <option value="Deportivo">Deportivo</option>
          <option value="Eléctrico">Eléctrico</option>
          <option value="Berlina">Berlina</option>
          <option value="Utilitario">Utilitario</option>
        </select>

        <select className="filter-select" onChange={(e) => setOrden(e.target.value)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <option value="">Ordenar por precio</option>
          <option value="barato">Más económicos</option>
          <option value="caro">Más caros</option>
        </select>
      </div>

      <div className="swiper-viewport">
        {filtrados.length > 0 ? (
          <Swiper
            key={filtrados.length} //Para que se reinice el carrusel si cambia el número de coches
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={filtrados.length > 3}
            noSwiping={true}
            noSwipingClass="swiper-no-swiping"
            coverflowEffect={{
              rotate: 20,
              stretch: -10,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {filtrados.map((coche) => (
              <SwiperSlide key={coche.id}>
                <TarjetaCoche coche={coche} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-results-text">No hay vehículos que coincidan.</p>
        )}
      </div>
    </section>
  );
}

export default Catalogo;