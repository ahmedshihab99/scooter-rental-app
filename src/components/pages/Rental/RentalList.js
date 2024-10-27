import React, { useEffect, useState } from "react";
import RentalService from "../../services/RentalService";

const RentalList = () => {
  const [activeRentals, setActiveRentals] = useState([]);

  useEffect(() => {
    const fetchActiveRentals = async () => {
      try {
        const rentals = await RentalService.getActiveRentals();
        setActiveRentals(rentals);
      } catch (error) {
        console.error("Error fetching active rentals:", error);
      }
    };

    fetchActiveRentals();
  }, []);

  return (
    <div>
      <h2>Active Rentals</h2>
      {activeRentals.length === 0 ? (
        <p>No active rentals</p>
      ) : (
        <ul>
          {activeRentals.map((rental) => (
            <li key={rental.id}>
              {rental.user} is renting a scooter until {rental.endDate}.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentalList;

