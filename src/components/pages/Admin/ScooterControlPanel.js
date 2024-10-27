import React, { useState } from "react";
import ScooterService from "../../services/ScooterService";
import "./AdminPage.css";

const ScooterControlPanel = () => {
  const [scooterId, setScooterId] = useState("");
  const [action, setAction] = useState("");

  const handleControl = async (e) => {
    e.preventDefault();
    try {
      if (action === "activate") {
        await ScooterService.activateScooter(scooterId);
      } else if (action === "deactivate") {
        await ScooterService.deactivateScooter(scooterId);
      }
      alert(`Scooter ${action}d successfully!`);
    } catch (err) {
      alert("Error controlling scooter");
    }
  };

  return (
    <div>
      <h2>Scooter Control Panel</h2>
      <form onSubmit={handleControl}>
        <div>
          <label>Scooter ID</label>
          <input
            type="text"
            value={scooterId}
            onChange={(e) => setScooterId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Action</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} required>
            <option value="">Select Action</option>
            <option value="activate">Activate</option>
            <option value="deactivate">Deactivate</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScooterControlPanel;

