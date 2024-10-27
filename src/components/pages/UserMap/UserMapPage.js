import React, { useState, useEffect } from "react";
import MapComponent from "../../Map/MapComponent";
import ScooterService from "../../services/ScooterService";

const UserMapPage = () => {
  const [scooters, setScooters] = useState([]);

  useEffect(() => {
    const fetchScooters = async () => {
      const data = await ScooterService.getAllScooters();
      setScooters(data);
    };

    fetchScooters();
  }, []);

  return (
    <div>
      {/* <h1>Scooter Availability Map</h1> */}
      <MapComponent scooters={scooters} />
    </div>
  );
};

export default UserMapPage;

