// File: GeoFenceMapComponent.js

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import scooterIconImg from "../../assets/scooter-icon.png";

// Define the scooter icon using the imported image
const scooterIcon = new L.Icon({
  iconUrl: scooterIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Component to handle map click events for adding points
const MapClickHandler = ({ onPointAdded, isAddingPoint }) => {
  useMapEvents({
    dblclick(e) {
      if (isAddingPoint) {
        const { lat, lng } = e.latlng;
        onPointAdded([lat, lng]);
      }
    },
  });
  return null;
};

// Refocus button component
const MapRefocusButton = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (!userPosition) return;

    const refocusControl = L.control({ position: "bottomleft" });

    refocusControl.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
      div.style.backgroundColor = "white";
      div.style.padding = "5px";
      div.style.cursor = "pointer";
      div.innerHTML = "📍 Refocus";

      div.onclick = () => {
        map.setView([userPosition.lat, userPosition.lng], 13);
      };

      return div;
    };

    refocusControl.addTo(map);

    return () => {
      map.removeControl(refocusControl);
    };
  }, [map, userPosition]);

  return null;
};

// Main Map Component
const GeofenceMapComponent = ({ geofencePoints = [], onPointAdded, isAddingPoint, editable }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [geofences, setGeofences] = useState([]);

  // Fetch geofences from API
  useEffect(() => {
    const fetchGeofences = async () => {
      try {
        const response = await fetch("http://localhost:8900/geofence");
        const data = await response.json();
        setGeofences(data.geofences || []);
      } catch (error) {
        console.error("Error fetching geofences:", error);
      }
    };

    fetchGeofences();
  }, []);

  // Track user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error watching user location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <MapContainer center={[30.0444, 31.2357]} zoom={13} style={{ height: "700px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapClickHandler onPointAdded={onPointAdded} isAddingPoint={isAddingPoint} />

      {/* Add markers for each geofence point */}
      {(geofencePoints || []).map((point, index) => (
        <Marker key={index} position={point} icon={scooterIcon}>
          <Popup>
            Point {index + 1}: (Lat: {point[0].toFixed(6)}, Lng: {point[1].toFixed(6)})
          </Popup>
        </Marker>
      ))}

      {/* Draw the geofence polygon if there are enough points */}
      {geofencePoints.length > 2 && (
        <Polygon positions={geofencePoints} color="blue" />
      )}

      {/* Display geofences from the backend */}
      {geofences.map((geofence) => (
        <Polygon
          key={geofence.id}
          positions={geofence.coordinates}
          color="blue"
          pathOptions={{ fillOpacity: 0.2 }}
        >
          <Popup>{geofence.name}</Popup>
        </Polygon>
      ))}

      {/* Display the user's location marker */}
      {userPosition && (
        <Marker position={[userPosition.lat, userPosition.lng]}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Refocus button to pan the map to the user's position */}
      <MapRefocusButton userPosition={userPosition} />
    </MapContainer>
  );
};

export default GeofenceMapComponent;
