import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ScooterMarker from "./ScooterMarker";
import ScooterService from "../services/ScooterService";

const MapComponent = ({ userPosition }) => {
  const [scooters, setScooters] = useState([]);

  useEffect(() => {
    const fetchScooters = async () => {
      const response = await ScooterService.getAllScooters();
      setScooters(response);
    };
    fetchScooters();
  }, []);

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]} // Default coordinates, will be overridden
        zoom={13}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {scooters.map((scooter) => (
          <ScooterMarker key={scooter.id} scooter={scooter} />
        ))}
        {userPosition && <UserLocationMarker userPosition={userPosition} />}
      </MapContainer>
    </div>
  );
};

// Component to handle setting the map view based on user position
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

export default MapComponent;
