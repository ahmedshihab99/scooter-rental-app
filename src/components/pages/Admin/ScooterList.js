import React, { useState, useEffect } from "react";
import ScooterService from "../../services/ScooterService";
import "./AdminPage.css";

const ScooterList = () => {
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
      <h2>Scooter List</h2>
      <ul>
        {scooters.map((scooter) => (
          <li key={scooter.id}>
            {scooter.name} - Status: {scooter.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScooterList;

