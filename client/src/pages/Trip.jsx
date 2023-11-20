import { useState } from "react";
import { useParams } from "react-router-dom";
import types from "../utilities/types";
import useInterval from "../hooks/useInterval";
import Map from "../components/Map";
import "./Trip.css";


// Declara una variable global para almacenar el ID del viaje
let trip_id = null;


export default function Trip() {
   // Estado para verificar si el viaje ha comenzado
  const [hasStarted, setHasStarted] = useState(false);
  // Obtiene el parámetro type_id de la URL
  const { type_id } = useParams();
  // Estado para almacenar los intervalos del viaje
  const [intervals, setIntervals] = useState([]);
  let user_id = 1;

  async function createNewTrip() {
    try {
      const response = await fetch(`/api/trips/new/${user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: types[type_id],
        }),
      });

      const result = await response.json();
      console.log(result)
      // Retorna el ID del viaje creado
      return result.trip_id;
    } catch (error) {}
  }

   // Función asincrónica para crear un nuevo intervalo
  async function createNewInterval(interval) {
    console.log("new interval", interval);
    try {
      const response = await fetch(`/api/trips/${interval.trip_id}/intervals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(interval),
      });
      const result = await response.json();
      // Actualiza el estado de los intervalos con la respuesta del servidor
      setIntervals(result);
    } catch (error) {}
  }

  
  // Función para obtener la ubicación y crear un nuevo intervalo
  async function getLocationAndCreateInterval() {
    console.log("Trip ID:", trip_id);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const interval_latitude = position.coords.latitude;
        const interval_longitude = position.coords.longitude;
        
        // Crea un nuevo intervalo con la ubicación actual y el ID del viaje
        createNewInterval({ interval_latitude, interval_longitude, trip_id });
      });
    }
  }
  
  
  const handleStart = async () => {
    // Obtiene el ID del nuevo viaje y lo almacena en trip_id
    trip_id = await createNewTrip();
    console.log(trip_id);
    setHasStarted(true);
  };
  const handleStop = async () => {
    // Cambia el estado a indicar que el viaje se ha detenido
    setHasStarted(false);
  };
  const handleResume = async () => {
    // Cambia el estado a indicar que el viaje se ha reanudado
    setHasStarted(true);
  };
  
  // Hook useInterval para ejecutar getLocationAndCreateInterval 
  // cada 5 segundos si el viaje ha comenzado
  useInterval(() => {
    if (hasStarted) getLocationAndCreateInterval();
  }, 5000);

  const handleButtonClick = () => {
    if (hasStarted) {
      handleStop();
    } else {
      handleStart();
    }
  };


  return (

    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
              <h3>{`${types[type_id]}`}</h3>
            <div className="col-md-6 d-flex justify-content-center">
              <button
                onClick={handleButtonClick}
                type="button"
                className={`button ${hasStarted ? 'stop' : 'start'}`}
              >
                {hasStarted ? 'Stop' : 'Start'}
                {/* <img
                    src={hasStarted ? "./images/stop-icon.png" : "./images/play-icon.png"}
                    alt={hasStarted ? "Stop" : "Play"}
                  /> */}
              </button>
            </div>
          </div>
          {!hasStarted && (
            <div className="row mt-2">
              <div className="col-md-12">
                <button
                  onClick={handleResume}
                  type="button"
                  className="btn btn-warning btn-block"
                >
                  Pause
                </button>
              </div>
            </div>
          )}
           {/* Muestra el número de viaje actual */}
          <h4 className="mt-4">{`Trip number: ${trip_id}`}</h4>
        </div>
         {/* Columna para el componente Map (comentado por ahora) */}
        <div className="col-md-4">
        <Map intervals={intervals} />
       </div>
      </div>
    </div>
  );
}






{/* Muestra los intervalos si el viaje ha comenzado */}
{/* {hasStarted && <h6>These are your intervals:</h6>} */}

 {/* Lista los intervalos */}
{/* <ul>
 {intervals.map((interval) => (
   <li key={interval.id}>
     Longitude: {interval.interval_longitude}, Latitude:
     {interval.interval_latitude}
   </li>
 ))}
</ul> */}