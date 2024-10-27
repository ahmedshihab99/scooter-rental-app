import React, { useState, useEffect } from "react";
import ScooterService from "../../services/ScooterService";
import UserService from "../../services/UserService";

const StatisticsPage = () => {
  const [scooterStats, setScooterStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const scooterData = await ScooterService.getScooterStatistics();
        const userData = await UserService.getUserStatistics();
        setScooterStats(scooterData);
        setUserStats(userData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  return (
    <div>
      <h1>Statistics Overview</h1>
      
      {scooterStats && (
        <div className="statistics-section">
          <h2>Scooter Statistics</h2>
          <p>Total Scooters: {scooterStats.totalScooters}</p>
          <p>Active Scooters: {scooterStats.activeScooters}</p>
          <p>Rented Scooters: {scooterStats.rentedScooters}</p>
        </div>
      )}

      {userStats && (
        <div className="statistics-section">
          <h2>User Statistics</h2>
          <p>Total Users: {userStats.totalUsers}</p>
          <p>Active Rentals: {userStats.activeRentals}</p>
          <p>Completed Rentals: {userStats.completedRentals}</p>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;

