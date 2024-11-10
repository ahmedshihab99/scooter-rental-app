import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ScooterService from "../services/ScooterService";
import scooterIconImg from "../../assets/scooter-icon.png";

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
        const response = await fetch("http://localhost:8900/geofence");
        const data = await response.json();
        setGeofences(data.geofences || []);
      } catch (error) {
        console.error("Error fetching geofences:", error);
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

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, []);

  // Function to check if a point is inside a geofence polygon
  const isInsideGeofence = (lat, lng) => {
    const point = L.latLng(lat, lng);
    return geofences.some((geofence) =>
      L.polygon(geofence.coordinates).getBounds().contains(point)
    );
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "700px", width: "100%" }}>
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
          color="blue"
          pathOptions={{ fillOpacity: 0.2 }}
        >
          <Popup>{geofence.name}</Popup>
        </Polygon>
      ))}
      <MapRefocusButton userPosition={userPosition} />
    </MapContainer>
  );
};

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
