/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Swal from 'sweetalert2'; 
import { postCoche } from '../services/api'; 
import "../styles/Vender.css";

function Vender() {
  // Creamos un objeto que guarda todos los campos del formulario.
  const [coche, setCoche] = useState({
    marca: '',
    modelo: '',
    precio: '',
    year: '',
    categoria: '',
    motor: '',
    descripcion: ''
  });

  // Cada vez que el usuario escribe se ejecuta la función
  const handleChange = (e) => {
    const { name, value } = e.target; //Se coge el nombre del input y su valor
    
    // Actualizamos el estado manteniendo lo que ya había, copiando el array inicial
    // y cambiando solo el campo que el usuario está tocando ([name]: value)
    setCoche({ ...coche, [name]: value });
  };

  //enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const marca = coche.marca.toLowerCase().trim();
    const modelo = coche.modelo.toLowerCase().trim();
    const randomSig = Math.floor(Math.random() * 5000);
    const queryBusqueda = `car,automobile,${marca},${modelo}`;

    // Creamos el objeto final que irá a la base de datos
    const nuevoCoche = {
      ...coche,
      // se genera una imagen aleatoria basada en la marca y modelo
      imagen: `https://loremflickr.com/800/600/${queryBusqueda}/all?lock=${randomSig}`,
      seguridad: "5 / 5" 
    };

    try {
      // Envio el nuevo coche al servidor a través del post de nuestra api
      await postCoche(nuevoCoche);

      // Alerta de éxito
      Swal.fire({
        title: '¡Publicado!',
        text: ` ${coche.marca} ${coche.modelo} se ha añadido correctamente.`,
        icon: 'success',
        confirmButtonColor: '#e63946'
      });
      
      // 5.Dejamos el formulario como estaba al inicio, para poder subir otro coche
      setCoche({ marca: '', modelo: '', precio: '', year: '', categoria: '', motor: '', descripcion: '' });
      
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  };

  return (
    <div className="vender-container">
      <div className="vender-card">
        <h2 className="vender-titulo">Vender <span className="rojo">Vehículo</span></h2>
        
        {/* El evento onSubmit se pone en la etiqueta <form> */}
        <form onSubmit={handleSubmit} className="vender-form">
          <div className="input-group">
            <div className="input-box">
              <label>Marca</label>
              <input 
                type="text" 
                name="marca" // El name debe coincidir con la clave del estado
                value={coche.marca} // El valor lo lee del estado
                onChange={handleChange} // Al escribir, llama a la función
                placeholder="Ej: Seat" 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn-publicar">Publicar Vehículo</button>
        </form>
      </div>
    </div>
  );
}

export default Vender;