import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "../styles/GraficoCategorias.css"; 

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoCategorias() {
  const [datosGrafico, setDatosGrafico] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/coches")
      .then(res => res.json())
      .then(coches => {
        const contar = {}; //Creamos un objeto vacio para acumular el conteo
        coches.forEach(c => {
          contar[c.categoria] = (contar[c.categoria] || 0) + 1; //Si ya existe una categoria en contar le suma 1, si no la crea
        });                                                     //con el valor 0 y le suma 1

        setDatosGrafico({
          labels: Object.keys(contar), // Etiquetas : Suv, deportivo...
          datasets: [{
            label: 'Unidades',
            data: Object.values(contar), //Cuantos hay de cada categoría
            backgroundColor: [
              '#fdcb6e', 
              '#ff7f50', 
              '#0097e6', 
              '#e63946', 
              '#e1b12c'  
            ],
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverOffset: 15
          }]
        });
      });
  }, []);

  return (
    <section className="grafico-section">
      <div className="grafico-card">
        <h2>Nuestro <span className="text-red-600">Inventario</span></h2>
        
        {/* PARRAFO DESCRIPTIVO AÑADIDO AQUÍ */}
        <p className="grafico-descripcion">
          En Alfonso Motors mantenemos un stock equilibrado para cada tipo de conductor. 
          Aquí puedes visualizar de forma dinámica la distribución actual de nuestro stock 
          según su categoría.
        </p>
        
        <div className="canvas-container">
          {datosGrafico && (
            <Pie 
              data={datosGrafico} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    }
                  }
                }
              }} 
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default GraficoCategorias;