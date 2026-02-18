import Catalogo from "../components/Catalogo";
import Footer from "../components/Footer";
import GraficoCategorias from "../components/GraficoCategorias";
import Historia from "../components/Historia";


function Home() {
  return (
    <div>
      {/* Sección Hero (Bienvenida) */}
      <header className="pt-32 pb-10 text-center">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter">
          Alfonso <span className="text-red-600">Motors</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-lg mx-auto mt-4">
          Donde la potencia se encuentra con la elegancia. Descubre nuestra colección exclusiva.
        </p>
      </header>

      <Historia/>
      <Catalogo />
      <GraficoCategorias/>
      <Footer/>

      
    </div>
  );
}

export default Home;