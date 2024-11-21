import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GeofenceService from "../services/GeofenceService";
import ScooterService from "../services/ScooterService";
import scooterIconImg from "../../assets/scooter-icon.png";
import MapRefocusButton from "./MapRefocusButton";  // Import the refocus button


const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/geofences`;

// Define the scooter icon using the imported image
const scooterIcon = new L.Icon({
  iconUrl: scooterIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// UserLocationMarker component
const UserLocationMarker = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.setView([userPosition.lat, userPosition.lng], 13);
    }
  }, [userPosition, map]);

  return (
    userPosition && (
      <Marker position={[userPosition.lat, userPosition.lng]}>
        <Popup>You are here</Popup>
      </Marker>
    )
  );
};

const MapComponent = () => {
  const [scooters, setScooters] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [geofences, setGeofences] = useState([]);

  // Fetch geofences from API
  useEffect(() => {
    const fetchGeofences = async () => {
      try {
        const data = await GeofenceService.getAllGeofences();
        console.log("Fetched geofences:", data); // Log the response
        setGeofences(data || []); // Ensure data is an array or set as an empty array
      } catch (error) {
        console.error("Error fetching geofences:", error);
        setGeofences([]); // Fallback to empty array on error
      }
    };
    

    fetchGeofences();
  }, []);

  // Fetch scooters data every 5 seconds for real-time updates
  useEffect(() => {
    const fetchScooters = async () => {
      const response = await ScooterService.getAllScooters();
      setScooters(response);
    };

    fetchScooters();
    const intervalId = setInterval(fetchScooters, 5000); // Polling every 5 seconds

    // Watch user position
if (window.isSecureContext && navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setUserPosition({ lat: latitude, lng: longitude });
    },
    (error) => console.error("Error watching user location:", error),
    { enableHighAccuracy: true }
  );
} else {
  console.error("Geolocation is not supported or running on an insecure origin.");
}


    // Cleanup interval
    return () => clearInterval(intervalId);
  }, []);

  // Function to check if a point is inside a geofence polygon
const isInsideGeofence = (lat, lng) => {
  const point = L.latLng(lat, lng);

  return geofences.some((geofence) => {
    // Validate if geofence coordinates are defined and not empty
    if (!geofence.coordinates || geofence.coordinates.length === 0) {
      console.warn(`Invalid geofence coordinates for geofence ID: ${geofence.id}`);
      return false;
    }

    try {
      // Create polygon and check if point is within bounds
      const polygon = L.polygon(geofence.coordinates);
      return polygon.getBounds().contains(point);
    } catch (error) {
      console.error(`Error checking geofence ID: ${geofence.id}`, error);
      return false;
    }
  });
};


  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {scooters.map((scooter) => (
        <ScooterMarker key={scooter.id} scooter={scooter} isInsideGeofence={isInsideGeofence} />
      ))}
      {userPosition && <UserLocationMarker userPosition={userPosition} />}
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
      <MapRefocusButton userPosition={userPosition} />
    </MapContainer>
  );
};



// ScooterMarker component with geofencing check
const ScooterMarker = ({ scooter, isInsideGeofence }) => {
  const insideGeofence = isInsideGeofence(scooter.latitude, scooter.longitude);

  return (
    <Marker
      position={[scooter.latitude, scooter.longitude]}
      icon={scooterIcon}
      style={{ filter: insideGeofence ? "none" : "grayscale(100%)" }}
    >
      <Popup>
        <div>
          <strong>Serial Number:</strong> {scooter.serialNumber} <br />
          <strong>Battery Level:</strong> {scooter.batteryLevel}% <br />
          <strong>Status:</strong> {scooter.status} <br />
          {scooter.location && (
            <>
              <strong>Location:</strong> {scooter.location.name} <br />
            </>
          )}
          {!insideGeofence && <strong style={{ color: "red" }}>Outside Geofence!</strong>}
        </div>
      </Popup>
    </Marker>
  );
};

export default MapComponent;
