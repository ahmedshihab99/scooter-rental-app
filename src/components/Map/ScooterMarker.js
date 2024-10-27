import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom scooter icon
const scooterIcon = new L.Icon({
  iconUrl: "/scooter-icon.png", // Add your scooter icon file to public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const ScooterMarker = ({ scooter }) => {
  return (
    <Marker
      position={[scooter.latitude, scooter.longitude]}
      icon={scooterIcon}
    >
      <Popup>
        <div>
          <h3>{scooter.name}</h3>
          <p>Status: {scooter.status}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default ScooterMarker;

