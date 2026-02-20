/* eslint-disable no-unused-vars */
import { useState } from 'react'; // Necesario para el formulario
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Swal from 'sweetalert2'; // Para la confirmación
import { postMensaje } from '../services/api'; 
import "../styles/Contacto.css";

// Arreglo de iconos para React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Contacto() {
  const posicion = [40.489272, -3.673117];

  // 1. Estado para capturar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // 2. Función para actualizar el estado al escribir
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Función para enviar los datos a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postMensaje(formData);
      Swal.fire({
        title: '¡Mensaje Enviado!',
        text: 'Se ha guardado en nuestro sistema correctamente.',
        icon: 'success',
        confirmButtonColor: '#e63946'
      });
      // Limpiar el formulario tras el éxito
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  };

  return (
    <div className="contacto-page">
      <h1 className="titulo-contacto">
        Contacto 
      </h1>

      <div className="dos-columnas">
        
        <div className="caja-mapa">
          <MapContainer center={posicion} zoom={15} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={posicion}>
              <Popup>Alfonso Motors</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="caja-info">
          <h3>Datos del Taller</h3>
          
          <p>
            <strong>Ubicación</strong>
            Av. de Burgos, 87, Fuencarral-El Pardo, 28050 Madrid
          </p>

          <p>
            <strong>Teléfono</strong>
            912 03 54 10
          </p>

          <p>
            <strong>Horario Laboral</strong>
            Lunes a Viernes: 08:00 - 20:00 <br/>
            Sábados: 10:00 - 14:00
          </p>

          <hr className="divisor" />

          {/* 4. SECCIÓN DEL FORMULARIO AÑADIDA */}
          <h3 style={{ marginTop: '20px' }}>Envíanos un mensaje</h3>
          <form onSubmit={handleSubmit} className="contacto-form">
            <div className="input-box-contacto">
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box-contacto">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box-contacto">
              <label>Mensaje</label>
              <textarea 
                name="mensaje" 
                value={formData.mensaje} 
                onChange={handleChange} 
                rows="3" 
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-enviar-contacto">Enviar Consulta</button>
          </form>

          <div className="urgencias-container">
            <p className="urgencias-texto">
              <span className="urgencias-resaltado">¿Urgencias?</span> Atendemos sin cita previa.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contacto;