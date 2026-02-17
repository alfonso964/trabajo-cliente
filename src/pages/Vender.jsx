/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Swal from 'sweetalert2'; 
import "../styles/Vender.css";

function Vender() {
  const [coche, setCoche] = useState({
    marca: '',
    modelo: '',
    precio: '',
    year: '',
    categoria: '',
    motor: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoche({ ...coche, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Limpieza de datos para la API
    const marca = coche.marca.toLowerCase().trim();
    const modelo = coche.modelo.toLowerCase().trim();
    const randomSig = Math.floor(Math.random() * 5000);

    /**
     * ESTRATEGIA ANTI-FALLO (Ford Focus, Dacia, etc.):
     * 1. Usamos "exterior" y "car" para evitar fotos de interiores o logos.
     * 2. Repetimos la marca para dar fuerza a la búsqueda.
     * 3. Mantenemos /all para que la API sea estricta.
     */
    const terminosBusqueda = `car,${marca},${modelo},exterior,vehicle`;

    const nuevoCoche = {
      ...coche,
      // URL optimizada para evitar confusiones de la IA de LoremFlickr
      imagen: `https://loremflickr.com/800/600/${terminosBusqueda}/all?lock=${randomSig}`,
      seguridad: "5 / 5" 
    };

    try {
      const res = await fetch("http://localhost:3001/coches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCoche)
      });

      if (res.ok) {
        Swal.fire({
          title: '¡Publicado!',
          text: `El ${coche.marca} ${coche.modelo} se ha añadido correctamente.`,
          icon: 'success',
          confirmButtonColor: '#e63946'
        });
        
        setCoche({ marca: '', modelo: '', precio: '', year: '', categoria: '', motor: '', descripcion: '' });
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  };

  return (
    <div className="vender-container">
      <div className="vender-card">
        <h2 className="vender-titulo">Vender <span className="rojo">Vehículo</span></h2>
        
        <form onSubmit={handleSubmit} className="vender-form">
          <div className="input-group">
            <div className="input-box">
              <label>Marca</label>
              <input type="text" name="marca" value={coche.marca} onChange={handleChange} placeholder="Ej: Ford" required />
            </div>
            <div className="input-box">
              <label>Modelo</label>
              <input type="text" name="modelo" value={coche.modelo} onChange={handleChange} placeholder="Ej: Focus" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label>Precio (€)</label>
              <input type="number" name="precio" value={coche.precio} onChange={handleChange} placeholder="0" required />
            </div>
            <div className="input-box">
              <label>Año</label>
              <input type="number" name="year" value={coche.year} onChange={handleChange} placeholder="2024" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label>Categoría</label>
              <select name="categoria" value={coche.categoria} onChange={handleChange} required>
                <option value="">Selecciona...</option>
                <option value="Utilitario">Utilitario</option>
                <option value="SUV">SUV</option>
                <option value="Berlina">Berlina</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Deportivo">Deportivo</option>
              </select>
            </div>
            <div className="input-box">
              <label>Motor</label>
              <input type="text" name="motor" value={coche.motor} onChange={handleChange} placeholder="Ej: 1.5 EcoBlue" required />
            </div>
          </div>

          <div className="input-box">
            <label>Descripción</label>
            <textarea 
              name="descripcion" 
              value={coche.descripcion} 
              onChange={handleChange} 
              placeholder="Estado del vehículo, extras, etc."
              rows="3"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="btn-publicar">Publicar Vehículo</button>
        </form>
      </div>
    </div>
  );
}

export default Vender;
