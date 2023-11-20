
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ intervals }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Crea el mapa si no existe
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([41.4051161, 2.1651582], 16); // Establece la vista inicial
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current); // Capa de mapas base
    }

    // Elimina marcadores existentes
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    let lastMarker; // Definir una variable para almacenar el último marcador

    intervals.forEach((interval, index) => {
      const marker = L.marker([interval.interval_latitude, interval.interval_longitude])
        .addTo(mapRef.current)
        .bindPopup(`Interval ${index + 1}`);
  
      //lastMarker = marker; // Actualizar la variable lastMarker con el marcador actual
  

        centerLeafletMapOnMarker(mapRef.current);
    });
  }, [intervals]);

  const centerLeafletMapOnMarker = (map) => {
    const latLngs = intervals.map(e => [e.interval_latitude, e.interval_longitude] )//[marker.getLatLng()];
    const markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  };

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default Map;








