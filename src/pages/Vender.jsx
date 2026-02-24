/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Swal from 'sweetalert2'; 
import { postCoche } from '../services/api'; 
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

    const marca = coche.marca.toLowerCase().trim();
    const modelo = coche.modelo.toLowerCase().trim();
    const randomSig = Math.floor(Math.random() * 5000);
    const queryBusqueda = `car,automobile,${marca},${modelo}`;

    const nuevoCoche = {
      ...coche,
      precio: Number(coche.precio),
      year: Number(coche.year),
      imagen: `https://loremflickr.com/800/600/${queryBusqueda}/all?lock=${randomSig}`,
      seguridad: "5" 
    };

    try {
      await postCoche(nuevoCoche);
      Swal.fire({
        title: '¡Publicado!',
        text: `${coche.marca} ${coche.modelo} se ha añadido correctamente.`,
        icon: 'success',
        confirmButtonColor: '#e63946'
      });
      
      setCoche({ marca: '', modelo: '', precio: '', year: '', categoria: '', motor: '', descripcion: '' });
      
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  };

  return (
    <div className="vender-container">
      <div className="vender-card">
        <h2 className="vender-titulo">Vender <span className="rojo">Vehículo</span></h2>
        
        <form onSubmit={handleSubmit} className="vender-form">
          
          {/* FILA 1: MARCA Y MODELO */}
          <div className="input-group">
            <div className="input-box">
              <label>Marca</label>
              <input type="text" name="marca" value={coche.marca} onChange={handleChange} placeholder="Ej: Seat" required />
            </div>
            <div className="input-box">
              <label>Modelo</label>
              <input type="text" name="modelo" value={coche.modelo} onChange={handleChange} placeholder="Ej: Ibiza" required />
            </div>
          </div>

          {/* FILA 2: PRECIO Y AÑO */}
          <div className="input-group">
            <div className="input-box">
              <label>Precio (€)</label>
              <input type="number" name="precio" value={coche.precio} onChange={handleChange} placeholder="Ej: 15000" required />
            </div>
            <div className="input-box">
              <label>Año</label>
              <input type="number" name="year" value={coche.year} onChange={handleChange} placeholder="Ej: 2022" required />
            </div>
          </div>

          {/* FILA 3: CATEGORÍA Y MOTOR */}
          <div className="input-group">
            <div className="input-box">
              <label>Categoría</label>
              <select name="categoria" value={coche.categoria} onChange={handleChange} required>
                <option value="">Selecciona...</option>
                <option value="SUV">SUV</option>
                <option value="Deportivo">Deportivo</option>
                <option value="Sedán">Sedán</option>
                <option value="Compacto">Compacto</option>
                <option value="Familiar">Familiar</option>
              </select>
            </div>
            <div className="input-box">
              <label>Motor</label>
              <input type="text" name="motor" value={coche.motor} onChange={handleChange} placeholder="Ej: 1.5 TSI" required />
            </div>
          </div>

          {/* DESCRIPCIÓN (OCUPA TODO EL ANCHO) */}
          <div className="input-box">
            <label>Descripción</label>
            <textarea name="descripcion" value={coche.descripcion} onChange={handleChange} placeholder="Estado del vehículo..." rows="3" required></textarea>
          </div>

          <button type="submit" className="btn-publicar">Publicar Vehículo</button>
        </form>
      </div>
    </div>
  );
}

export default Vender;