import React from "react";
import ScooterList from "./ScooterList";
import ScooterControlPanel from "./ScooterControlPanel";
import "./AdminPage.css"; // Assuming you may want to add some styling for the admin page

const AdminPage = () => {
  return (
    <div className="admin-page">
      {/* <h1>Admin Dashboard</h1> */}
      <div className="admin-content">
        <div className="scooter-list">
          <ScooterList />
        </div>
        <div className="scooter-control">
          <ScooterControlPanel />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

