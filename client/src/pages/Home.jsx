import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import types from "../utilities/types";  


export default function Home() {
  // Estado para almacenar el tipo de viaje seleccionado
  const [selectedTrip, setSelectedTrip] = useState(1);
  
  // Función asincrónica para obtener datos de viajes desde la API
  // Nota: Hay un error aquí, debería ser setTrips(data) en lugar de getTrips(data)
  async function getTrips() {
    const response = await fetch("/api/trips");
    const data = await response.json();
    getTrips(data);
  }

 
  return (
    <div className="container-fluid">
      <div className="row justify-content-start mt-3 ml-3">
        <div className="col-md-8">
          <h2>Where are we going today, biker?</h2>
        </div>
      </div>

         {/* Selector de tipo de viaje y botón para iniciar */}
      <div className="row justify-content-start mt-3 ml-3">
        <div className="col-md-8">
          <div className="mb-3 d-flex align-items-center">
           {/* Dropdown para seleccionar el tipo de viaje */}
            <select
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="form-control mr-2"
            >
              {/* Mapea los tipos de viaje y crea opciones en el dropdown */}
              {Object.keys(types).map((tripType) => (
                <option key={tripType} value={tripType}>
                  {types[tripType]}
                </option>
              ))}
            </select>
            {/* Enlace para ir a la 
            página de creación de nuevo viaje con el tipo seleccionado */}
            <Link
              to={`/trips/new/${selectedTrip}`}
              className="btn btn-primary btn-sm ml-2"
            >
              Go
            </Link>

          </div>
        </div>
      <Outlet />
      </div>
    
    </div>
  );
}
