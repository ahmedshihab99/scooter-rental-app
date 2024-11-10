// File: GeofenceEditor.js

import React, { useState } from "react";
import { Button, List, ListItem } from "@mui/material";

const GeofenceEditor = ({ geofence, onSave, onCancel, onPointAdded }) => {
  const [isAddingPoint, setIsAddingPoint] = useState(false);

  const handleAddPointClick = () => {
    setIsAddingPoint(true);
  };

  const handleMapClick = (point) => {
    if (isAddingPoint) {
      onPointAdded(point);  // Add the clicked point to the geofence
      setIsAddingPoint(false);  // Stop adding mode after one click
    }
  };

  const handleCancel = () => {
    setIsAddingPoint(false);
  };

  return (
    <div>
      <h3>Edit Geofence: {geofence.name}</h3>
      {!isAddingPoint ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPointClick}
        >
          Add Point to Geofence
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
        style={{ marginLeft: "10px" }}
      >
        Save Geofence
      </Button>

      <List>
        {geofence.coordinates.map((point, index) => (
          <ListItem key={index}>
            {index + 1}. (Lat: {point[0].toFixed(6)}, Lng: {point[1].toFixed(6)})
          </ListItem>
        ))}
      </List>

      {/* Map click listener should pass `handleMapClick` to the map component */}
      {isAddingPoint && (
        <div style={{ color: "grey", marginTop: "10px" }}>
          Click on the map to add a point.
        </div>
      )}
    </div>
  );
};

export default GeofenceEditor;