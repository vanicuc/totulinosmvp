
import { useState, useEffect } from "react";
import Trip from "./Trip";
import types from "../utilities/types";



export default function EachTrips({ trip }) {
  const [userTrip, setUserTrip] = useState({
    name: "",
    user_id: "",
  });


  useEffect(() => {
    fetchUserTrip();
}, []); 

async function fetchUserTrip() {
    try {
        const response = await fetch(`/api/trips/new/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    
    const result = await response.json();
    setUserTrip(result);
} catch (error) {
    console.error("Error fetching user trip:", error);
    }
  }
  
  return (
      <>
      <div>

     PLace: {userTrip.user_id}  Trip: {userTrip.name}  
     
     {/* Time: {Interval.interval_time} */}
      </div>
     
    </>
  );
  
  
}
  





// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import types from "../utilities/types";
// import useInterval from "../hooks/useInterval";
// import Map from "../components/Map";
// import "./Trip.css";

// export default function Trip() {
//   const [hasStarted, setHasStarted] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const { type_id } = useParams();
//   const [intervals, setIntervals] = useState([]);
//   const [tripId, setTripId] = useState(null); // Utilizamos el estado local para almacenar trip_id
//   const { user_id } = useAuth(); // Suponiendo que tienes una función useAuth que devuelve el user_id del usuario autenticado

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
//       setTripId(result.trip_id); // Actualizamos el trip_id en el estado local
//       return result.trip_id;
//     } catch (error) {
//       console.error("Error creating trip:", error);
//     }
//   }

//   async function createNewInterval(interval) {
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
//       setIntervals(result);
//     } catch (error) {
//       console.error("Error creating interval:", error);
//     }
//   }

//   async function getLocationAndCreateInterval() {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const interval_latitude = position.coords.latitude;
//         const interval_longitude = position.coords.longitude;
//         createNewInterval({ interval_latitude, interval_longitude, trip_id: tripId });
//       });
//     }
//   }

//   const handleStart = async () => {
//     const newTripId = await createNewTrip();
//     setHasStarted(true);
//     setIsPaused(false);
//     setTripId(newTripId);
//   };

//   const handleStop = () => {
//     setHasStarted(false);
//   };

//   const handlePause = () => {
//     setIsPaused(!isPaused);
//   };

//   useInterval(() => {
//     if (hasStarted && !isPaused) getLocationAndCreateInterval();
//   }, 5000);

//   const handleButtonClick = () => {
//     if (hasStarted) {
//       handleStop();
//     } else {
//       handleStart();
//     }
//   };

//   return (
//     <div>
//       {/* Resto del componente permanece sin cambios */}
//     </div>
//   );
// }