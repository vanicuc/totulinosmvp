
import { useState, useEffect } from "react";

export default function EachTrips({ trip }) {
  const [userTrip, setUserTrip] = useState({
    name: "",
    user_id: "",
  });


//   useEffect(() => {
//     fetchUserTrip();
// }, []); 

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
  


