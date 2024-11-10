// File: GeofencingPage.js

import React, { useState, useEffect } from "react";
import GeofenceMapComponent from "../../Map/GeofenceMapComponent";
import { Button, List, ListItem, TextField } from "@mui/material";
import GeofenceService from "../../services/GeofenceService";

const GeofencingPage = () => {
    const [geofences, setGeofences] = useState([]);
    const [selectedGeofence, setSelectedGeofence] = useState(null);
    const [isAddingGeofence, setIsAddingGeofence] = useState(false);
    const [newGeofenceName, setNewGeofenceName] = useState("");

    // Fetch geofence areas from the backend
    const fetchGeofences = async () => {
        try {
            const response = await GeofenceService.getAllGeofences();
            setGeofences(response.geofences || []);
        } catch (error) {
            console.error("Error fetching geofence data:", error);
        }
    };

    useEffect(() => {
        fetchGeofences();
    }, []);

    const handleAddGeofence = () => {
        setIsAddingGeofence(true);
        setSelectedGeofence({ name: newGeofenceName, coordinates: [] });
    };

    const handlePointAdded = (point) => {
        if (selectedGeofence) {
            setSelectedGeofence((prevGeofence) => ({
                ...prevGeofence,
                coordinates: [...prevGeofence.coordinates, point],
            }));
        }
    };

    const handleSaveGeofence = async () => {
        try {
            if (isAddingGeofence) {
                // POST request to save new geofence
                console.log(selectedGeofence);
                await GeofenceService.addGeofence(selectedGeofence); // Assume this sends a POST to /geofence
                setIsAddingGeofence(false);
            } else {
                // PUT request to update existing geofence
                await GeofenceService.updateGeofence(selectedGeofence.id, selectedGeofence);
            }
            setSelectedGeofence(null);
            setNewGeofenceName("");
            await fetchGeofences();
        } catch (error) {
            console.error("Error saving geofence:", error);
        }
    };

    const handleEditGeofence = (geofence) => {
        setSelectedGeofence(geofence);
    };

    const handleClearCoordinates = () => {
        setSelectedGeofence((prevGeofence) => ({
            ...prevGeofence,
            coordinates: [],
        }));
    };

    // Cancel editing and clear the selected geofence
    const handleCancelEditing = () => {
        setSelectedGeofence(null);
        setIsAddingGeofence(false);
        setNewGeofenceName("");
    };

    return (
        <div>
            <h2>Geofence Management</h2>

            {/* Map Component renders on load */}
            <GeofenceMapComponent
                geofencePoints={selectedGeofence ? selectedGeofence.coordinates : []}
                onPointAdded={handlePointAdded}
                isAddingPoint={isAddingGeofence}
                editable={!!selectedGeofence}
            />

            {/* List of Geofences */}
            <List>
                {geofences.map((geofence) => (
                    <ListItem
                        button
                        key={geofence.id}
                        onClick={() => handleEditGeofence(geofence)}
                    >
                        {geofence.name}
                    </ListItem>
                ))}
            </List>

            {selectedGeofence ? (
                <div>
                    <h3>Edit Geofence: {selectedGeofence.name}</h3>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClearCoordinates}
                    >
                        Clear Coordinates
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveGeofence}
                        style={{ marginLeft: "10px" }}
                    >
                        Save Geofence
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleCancelEditing}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </Button>


                    <List>
                        {selectedGeofence.coordinates.map((point, index) => (
                            <ListItem key={index}>
                                {index + 1}. (Lat: {point[0].toFixed(6)}, Lng: {point[1].toFixed(6)})
                            </ListItem>
                        ))}
                    </List>
                </div>
            ) : (
                <div style={{ marginTop: "20px" }}>
                    <TextField
                        label="New Geofence Name"
                        variant="outlined"
                        value={newGeofenceName}
                        onChange={(e) => setNewGeofenceName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddGeofence}
                        style={{ marginLeft: "10px" }}
                    >
                        Add New Geofence
                    </Button>
                </div>
            )}
        </div>
    );
};

export default GeofencingPage;
