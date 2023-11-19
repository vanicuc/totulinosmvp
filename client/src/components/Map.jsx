
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ intervals }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Crea el mapa si no existe
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2); // Establece la vista inicial
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current); // Capa de mapas base
    }

    // Elimina marcadores existentes
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Agrega marcadores para cada intervalo
    intervals.forEach((interval, index) => {
      L.marker([interval.interval_latitude, interval.interval_longitude])
        .addTo(mapRef.current)
        .bindPopup(`Interval ${index + 1}`);
    });
  }, [intervals]);

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default Map;









// import { MapContainer, TileLayer, useMap } from 'react-leaflet'

// const Map = () => {

// MapComponent.js
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

//  const Map = ({ intervals }) => {
//   const [mapId] = useState(`map-${Math.random()}`);

//   useEffect(() => {
//     if (intervals.length === 0) {
//       return;
//     }

//     const map = L.map(mapId).setView(
//       [intervals[0]?.interval_latitude, intervals[0]?.interval_longitude],
//       15
//     );

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     intervals.forEach((interval, index) => {
//       L.marker([interval.interval_latitude, interval.interval_longitude])
//         .addTo(map)
//         .bindPopup(`Interval ${index + 1}`)
//         .openPopup();
//     });
//   }, [intervals, mapId]);

  
//     <div id={mapId} style={{ height: "400px" }}>
//       <MapContainer
//         center={[0, 0]}
//         zoom={2}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {intervals.map((interval, index) => (
//           <Marker
//             key={index}
//             position={[interval.interval_latitude, interval.interval_longitude]}
//           >
//             <Popup>{`Interval ${index + 1}`}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
//  };
