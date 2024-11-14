// File: GeoFenceMapComponent.js

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pointMarkerImg from "../../assets/pointMarker.png";
import MapRefocusButton from "./MapRefocusButton";  // Import the refocus button

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/geofences`;

console.log(`uri: ${API_URL}`);

// Define the scooter icon using the imported image
const pointMarkerIcon = new L.Icon({
  iconUrl: pointMarkerImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Component to handle map click events for adding points
const MapClickHandler = ({ onPointAdded, isAddingPoint, isEditingOrAdding }) => {
  useMapEvents({
    click(e) {
      if (isAddingPoint && isEditingOrAdding) {
        const { lat, lng } = e.latlng;
        onPointAdded([lat, lng]);
      }
    },
  });
  return null;
};

// Main Map Component
const GeofenceMapComponent = ({ geofencePoints = [], onPointAdded, onEditPoint, onDeletePoint, isAddingPoint, editable, isEditingOrAdding, isGeofenceAddedOrUpdated, setIsGeofenceAddedOrUpdated }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [geofences, setGeofences] = useState([]);

  // Fetch geofences from API
  const fetchGeofences = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setGeofences(data || []);
      setIsGeofenceAddedOrUpdated(false);
    } catch (error) {
      console.error("Error fetching geofences:", error);
    }
  };
  
  useEffect(() => {
    fetchGeofences();
  }, []);
  
  // Refetch geofences when updated
  useEffect(() => {
    if (isGeofenceAddedOrUpdated) {
        fetchGeofences().then(() => setIsGeofenceAddedOrUpdated()); // Reset flag after fetch
    }
}, [isGeofenceAddedOrUpdated]);

  
  

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
    <MapContainer center={[30.0444, 31.2357]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapClickHandler onPointAdded={onPointAdded} isAddingPoint={isAddingPoint} isEditingOrAdding={isEditingOrAdding} />

      {(geofencePoints || []).map((point, index) => (
        <Marker
          key={index}
          position={point}
          icon={pointMarkerIcon}
          eventHandlers={{
            click: () => isEditingOrAdding && onEditPoint(index),
          }}
        >
          <Popup>
            <div>
              <div>Point {index + 1}: (Lat: {point[0].toFixed(6)}, Lng: {point[1].toFixed(6)})</div>
              <button onClick={() => onDeletePoint(index)}>Delete</button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Draw the geofence polygon if there are enough points */}
      {geofencePoints.length > 2 && <Polygon positions={geofencePoints} color="blue" />}

      {/* Display geofences from the backend */}
      {geofences.map((geofence) => (
        <Polygon
          key={geofence.id}
          positions={geofence.coordinates}
          color="green"
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
