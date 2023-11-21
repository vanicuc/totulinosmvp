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
  const [isPaused, setIsPaused] = useState(false);

 
  // const [isFirstStart, setIsFirstStart] = useState(true);
  // Obtiene el parámetro type_id de la URL
  const { type_id } = useParams();
  // Estado para almacenar los intervalos del viaje
  const [intervals, setIntervals] = useState([]);

  // const user_id = getLoggedInUserId();
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
    trip_id = await createNewTrip();
    console.log(trip_id);
    setHasStarted(true);
    setIsPaused(false);

  
  };
  const handleStop = async () => {
    setHasStarted(false);
    // setIsPaused(true);
  
  };
  const handlePause= async () => {
    setIsPaused(!isPaused);

  };
  
  // Hook useInterval para ejecutar getLocationAndCreateInterval 
  // cada 5 segundos si el viaje ha comenzado
  useInterval(() => {
    if (hasStarted && !isPaused) getLocationAndCreateInterval();
  }, 5000);

  const handleButtonClick = () => {
    if (hasStarted) {
      handleStop();
      // setIsPaused(true);
    } else {
      handleStart();
    }
  };


  return (
    <div>

    <div className="flex-container">

      <div className="box-ruta">
          <h3>{`${types[type_id]}`}</h3>
      </div>

      <div className="play">
        <button
          onClick={handleButtonClick}
          type="button"
          className={`button ${!hasStarted ? 'start' : 'stop'}`}
          >
          {hasStarted ? 'Stop' : 'Start'}
        </button>
      </div>

      <div className="Continue">
        {/* {hasStarted && isPaused && !isFirstStart &&  (
           */}
        {hasStarted && (
          <button
            onClick={handlePause}
            type="button"
            className="btn btn-warning btn-block"
          >
           {isPaused  ? 'continuo' : 'Pause'}
          </button>
          )}
      </div>

      <div className="box-viajes">
          <h4 className="mt-4">{`Trip number: ${trip_id}`}</h4>
     </div>
    </div>

      <div className="box map">
        <Map intervals={intervals} />
      </div>
      
    </div>
  );
}






// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import types from "../utilities/types";
// import useInterval from "../hooks/useInterval";
// import Map from "../components/Map";
// import "./Trip.css";


// // Declara una variable global para almacenar el ID del viaje
// let trip_id = null;


// export default function Trip() {
//    // Estado para verificar si el viaje ha comenzado
//   const [hasStarted, setHasStarted] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

 
//   // const [isFirstStart, setIsFirstStart] = useState(true);
//   // Obtiene el parámetro type_id de la URL
//   const { type_id } = useParams();
//   // Estado para almacenar los intervalos del viaje
//   const [intervals, setIntervals] = useState([]);

//   // const user_id = getLoggedInUserId();
//   // let user_id = 2;

//   async function createNewTrip() {
//     try {
      
//       const response = await fetch(`/api/trips/new/${user_id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: JSON.stringify({
//           name: types[type_id],
//         }),
//       });

//       const result = await response.json();
//       console.log(result)
//       // Retorna el ID del viaje creado
//       return result.trip_id;
//     } catch (error) {}
//   }

//    // Función asincrónica para crear un nuevo intervalo
//   async function createNewInterval(interval) {
//     console.log("new interval", interval);
//     try {
//       const response = await fetch(`/api/trips/${interval.trip_id}/intervals`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: JSON.stringify(interval),
//       });
//       const result = await response.json();
//       // Actualiza el estado de los intervalos con la respuesta del servidor
//       setIntervals(result);
//     } catch (error) {}
//   }

  
//   // Función para obtener la ubicación y crear un nuevo intervalo
//   async function getLocationAndCreateInterval() {
//     console.log("Trip ID:", trip_id);
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const interval_latitude = position.coords.latitude;
//         const interval_longitude = position.coords.longitude;
        
//         // Crea un nuevo intervalo con la ubicación actual y el ID del viaje
//         createNewInterval({ interval_latitude, interval_longitude, trip_id });
//       });
//     }
//   }
  
  
//   const handleStart = async () => {
//     trip_id = await createNewTrip();
//     console.log(trip_id);
//     setHasStarted(true);
//     setIsPaused(false);

  
//   };
//   const handleStop = async () => {
//     setHasStarted(false);
//     // setIsPaused(true);
  
//   };
//   const handlePause= async () => {
//     setIsPaused(!isPaused);

//   };
  
//   // Hook useInterval para ejecutar getLocationAndCreateInterval 
//   // cada 5 segundos si el viaje ha comenzado
//   useInterval(() => {
//     if (hasStarted && !isPaused) getLocationAndCreateInterval();
//   }, 5000);

//   const handleButtonClick = () => {
//     if (hasStarted) {
//       handleStop();
//       // setIsPaused(true);
//     } else {
//       handleStart();
//     }
//   };


//   return (
//     <div>

//     <div className="flex-container">

//       <div className="box-ruta">
//           <h3>{`${types[type_id]}`}</h3>
//       </div>

//       <div className="play">
//         <button
//           onClick={handleButtonClick}
//           type="button"
//           className={`button ${!hasStarted ? 'start' : 'stop'}`}
//           >
//           {hasStarted ? 'Stop' : 'Start'}
//         </button>
//       </div>

//       <div className="Continue">
//         {/* {hasStarted && isPaused && !isFirstStart &&  (
//            */}
//         {hasStarted && (
//           <button
//             onClick={handlePause}
//             type="button"
//             className="btn btn-warning btn-block"
//           >
//            {isPaused  ? 'continuo' : 'Pause'}
//           </button>
//           )}
//       </div>

//       <div className="box-viajes">
//           <h4 className="mt-4">{`Trip number: ${trip_id}`}</h4>
//      </div>
//     </div>

//       <div className="box map">
//         <Map intervals={intervals} />
//       </div>
      
//     </div>
//   );
// }

