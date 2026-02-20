import Catalogo from "../components/Catalogo";
import Footer from "../components/Footer";
import GraficoCategorias from "../components/GraficoCategorias";
import Historia from "../components/Historia";


function Home() {
  return (
    <div>
     
      <Historia/>
      <Catalogo />
      <GraficoCategorias/>
      <Footer/>

      
    </div>
  );
}

export default Home;