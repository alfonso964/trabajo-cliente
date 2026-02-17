import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/Catalogo.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import TarjetaCoche from "./TarjetaCoche";

function Catalogo() {
  const [coches, setCoches] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/coches")
      .then((res) => res.json())
      .then((data) => {
        setCoches(data);
        setCargando(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (cargando) return <p className="loading-text">Cargando galería...</p>;

  return (
    /* He añadido 'py-12' para dar espacio arriba y abajo sin romper tu .catalogo-container */
    <section className="catalogo-container py-12">
      <h1 className="catalogo-titulo italic tracking-tighter">
        Explora nuestros <span className="text-red-600">modelos</span>
      </h1>
      
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}          
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
        {coches.map((coche) => (
          <SwiperSlide key={coche.id}>
            <TarjetaCoche coche={coche} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Catalogo;