import React, { useEffect, useState } from "react";
import RentalService from "../../services/RentalService";

const RentalApproval = () => {
  const [pendingRentals, setPendingRentals] = useState([]);

  useEffect(() => {
    const fetchPendingRentals = async () => {
      try {
        const rentals = await RentalService.getPendingRentals();
        setPendingRentals(rentals);
      } catch (error) {
        console.error("Error fetching pending rentals:", error);
      }
    };

    fetchPendingRentals();
  }, []);

  const handleApprove = async (rentalId) => {
    try {
      await RentalService.approveRental(rentalId);
      setPendingRentals(pendingRentals.filter((rental) => rental.id !== rentalId));
    } catch (error) {
      console.error("Error approving rental:", error);
    }
  };

  const handleReject = async (rentalId) => {
    try {
      await RentalService.rejectRental(rentalId);
      setPendingRentals(pendingRentals.filter((rental) => rental.id !== rentalId));
    } catch (error) {
      console.error("Error rejecting rental:", error);
    }
  };

  return (
    <div>
      <h2>Pending Rental Approvals</h2>
      {pendingRentals.length === 0 ? (
        <p>No pending rentals</p>
      ) : (
        <ul>
          {pendingRentals.map((rental) => (
            <li key={rental.id}>
              <span>{rental.user} requested a scooter at {rental.date}</span>
              <button onClick={() => handleApprove(rental.id)}>Approve</button>
              <button onClick={() => handleReject(rental.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentalApproval;

