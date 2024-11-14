// File: GeofencingPage.js

import React, { useState, useEffect } from "react";
import GeofenceMapComponent from "../../Map/GeofenceMapComponent";
import { Button, List } from "@mui/material";
import GeofenceService from "../../services/GeofenceService";
import CustomListItem from "../../reusableComponents/CustomListItem";
import CustomTextField from "../../reusableComponents/CustomTextField";
import "./Geofencing.css";

const GeofencingPage = () => {
    const [geofences, setGeofences] = useState([]);
    const [selectedGeofence, setSelectedGeofence] = useState(null);
    const [isAddingGeofence, setIsAddingGeofence] = useState(false);
    const [newGeofenceName, setNewGeofenceName] = useState("");
    const [newGeofenceType, setNewGeofenceType] = useState("");

    const [isListeningForPoint, setIsListeningForPoint] = useState(false);

    const [pointToEditIndex, setPointToEditIndex] = useState(null);
    const [editingPointIndex, setEditingPointIndex] = useState(null);
    const [pointToDeleteIndex, setPointToDeleteIndex] = useState(null);
    const [originalGeofenceCoordinates, setOriginalGeofenceCoordinates] = useState([]);

    const [isAddingAPoint, setIsAddingAPoint] = useState(false);

    const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);

    // New state variable for tracking geofence updates
    const [isGeofenceAddedOrUpdated, setIsGeofenceAddedOrUpdated] = useState(false);


    // Fetch Geofence
    const fetchGeofences = async () => {
        try {
            const response = await GeofenceService.getAllGeofences();
            setGeofences(response || []);
        } catch (error) {
            console.error("Error fetching geofence data:", error);
        }
    };

    useEffect(() => {
        fetchGeofences();
    }, []);


    // ADD NEW Geofence
    const handleAddGeofence = () => {
        setIsAddingGeofence(true);
        setSelectedGeofence({ name: newGeofenceName, geofenceType: "", coordinates: [] });
        setIsEditingOrAdding(true); // Lock existing geofences

    };

    // UPDATE Geofence
    const handleUpdateGeofence = async () => {
        try {
            console.log(`the following is the SG ${selectedGeofence.geofenceType}`);
            await GeofenceService.updateGeofence(selectedGeofence.id, selectedGeofence); // PUT request
            setSelectedGeofence(null); // reset after updating
            setIsGeofenceAddedOrUpdated(true);  // Set geofence updated to true
            await fetchGeofences(); // refresh list
        } catch (error) {
            console.error("Error updating geofence:", error);
        }
    };

    const handleEditGeofence = (geofence) => {
        setSelectedGeofence(geofence);
        setOriginalGeofenceCoordinates([...geofence.coordinates]); // track original points
        setIsEditingOrAdding(true); // Lock existing geofences
    };

    // For both ADD and UPDATE
    const handleSaveGeofence = async () => {
        try {
            if (isAddingGeofence) {
                await GeofenceService.addGeofence(selectedGeofence); // ADD
                setIsAddingGeofence(false);
            } else {
                await GeofenceService.updateGeofence(selectedGeofence.id, selectedGeofence); // UPDATE
            }
            setSelectedGeofence(null);
            setNewGeofenceName("");
            setNewGeofenceType("");
            setIsEditingOrAdding(false); // Unlock existing geofences
            setIsGeofenceAddedOrUpdated(true);  // Set geofence updated to true
            await fetchGeofences();
        } catch (error) {
            console.error("Error saving geofence:", error);
        }
    };

    // DELETE
    const handleDeleteGeofence = async (geofenceId) => {
        try {
            await GeofenceService.deleteGeofence(geofenceId); // DELETE request
            setSelectedGeofence(null);
            setIsGeofenceAddedOrUpdated(true);  // Trigger re-fetch of geofences
            await fetchGeofences(); // Refresh list
        } catch (error) {
            console.error("Error deleting geofence:", error);
        }
    };

    const handleStartListeningForPoint = () => {
        setIsListeningForPoint(true);
        setIsAddingAPoint(true); // New state to indicate a point is being added
        setEditingPointIndex(null); // Reset editing index to prevent conflict with add mode
        setPointToDeleteIndex(null); // Reset delete index as well

    };

    const handleCancelListening = () => {
        setIsListeningForPoint(false);
        setIsAddingAPoint(false); // Reset the state when canceling point addition

    };

    const handlePointAdded = (point) => {
        if (selectedGeofence && isListeningForPoint) {
            if (editingPointIndex !== null) {
                // Update the position of the selected point
                const updatedCoordinates = [...selectedGeofence.coordinates];
                updatedCoordinates[editingPointIndex] = point;
                setSelectedGeofence((prevGeofence) => ({
                    ...prevGeofence,
                    coordinates: updatedCoordinates,
                }));
                setEditingPointIndex(null);
            } else {
                // Add a new point
                setSelectedGeofence((prevGeofence) => ({
                    ...prevGeofence,
                    coordinates: [...prevGeofence.coordinates, point],
                }));
            }
            setIsListeningForPoint(false);
            setIsAddingAPoint(false);
        }
    };

    const handleDeletePoint = () => {
        setIsListeningForPoint(false); // Disable "Add Point" mode
        if (pointToDeleteIndex !== null && selectedGeofence) {
            const updatedCoordinates = selectedGeofence.coordinates.filter((_, index) => index !== pointToDeleteIndex);
            setSelectedGeofence((prevGeofence) => ({
                ...prevGeofence,
                coordinates: updatedCoordinates,
            }));
            setPointToDeleteIndex(null);
        }
    };



    const handleEditPoint = (index) => {
        setIsListeningForPoint(true);
        setEditingPointIndex(index);
        setPointToDeleteIndex(index);
    };



    const handleClearCoordinates = () => {
        setSelectedGeofence((prevGeofence) => ({
            ...prevGeofence,
            coordinates: [],
        }));
    };

    const handleClearNewCoordinates = () => {
        if (selectedGeofence && selectedGeofence.coordinates.length > originalGeofenceCoordinates.length) {
            setSelectedGeofence((prevGeofence) => ({
                ...prevGeofence,
                coordinates: originalGeofenceCoordinates, // reset to original points only
            }));
        }
    };


    const handleCancelEditing = () => {
        setSelectedGeofence(null);
        setIsAddingGeofence(false);
        setNewGeofenceName("");
        setNewGeofenceType("");
        setIsListeningForPoint(false);
        setIsEditingOrAdding(false); // Unlock existing geofences
    };

    return (
        <div className="geofence-main">
            <div className="geofence-container">
                <GeofenceMapComponent
                    geofencePoints={selectedGeofence ? selectedGeofence.coordinates : []}
                    onPointAdded={handlePointAdded}
                    onEditPoint={handleEditPoint}
                    onDeletePoint={handleDeletePoint}
                    isAddingPoint={isListeningForPoint}
                    editable={!!selectedGeofence}
                    isEditingOrAdding={isEditingOrAdding} // Pass the new prop
                    isGeofenceAddedOrUpdated={isGeofenceAddedOrUpdated} // Pass the new prop
                    setIsGeofenceAddedOrUpdated={() => setIsGeofenceAddedOrUpdated(false)} // Reset function
                />




                <div className="geofence-control">
                    {/* Geofences list */}
                    <List>
                        {geofences.map((geofence) => (
                            <div key={geofence.id} style={{ display: "flex", alignItems: "center" }}>
                                <CustomListItem button onClick={() => handleEditGeofence(geofence)}>
                                    {geofence.name}
                                </CustomListItem>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => handleDeleteGeofence(geofence.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </List>


                    {selectedGeofence ? (
                        <div>
                            <h3 style={{ color: "#999" }}>Edit Geofence: {selectedGeofence.name}</h3>
                            {selectedGeofence && selectedGeofence.id ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClearNewCoordinates} // new function for clearing only new points
                                >
                                    Clear New Coordinates
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClearCoordinates} // existing function
                                >
                                    Clear Coordinates
                                </Button>
                            )}

                            {/* // Replace the existing save button section in the return statement */}

                            <div style={{ display: "flex", marginTop: "10px" }}>
                                {selectedGeofence && selectedGeofence.id ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdateGeofence} // new function for updating geofence
                                    >
                                        Update Geofence
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSaveGeofence} // existing save function
                                    >
                                        Save Geofence
                                    </Button>
                                )}

                                <Button
                                    variant="outlined"
                                    onClick={handleCancelEditing}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </Button>
                            </div>

                            {!isAddingAPoint ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleStartListeningForPoint}
                                    style={{ marginTop: "10px" }}
                                >
                                    Add Point to Geofence
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleCancelListening}
                                    style={{ marginTop: "10px" }}
                                >
                                    Cancel Adding Point
                                </Button>
                            )}
                            
                            {/* Geofence Points */}
                            <List>
                                {selectedGeofence.coordinates.map((point, index) => (
                                    <CustomListItem
                                        key={index}
                                        hoverBgColor="#9c27b0"
                                        button
                                        onClick={() => handleEditPoint(index)}
                                    >
                                        {index + 1}. (Lat: {point[0].toFixed(6)}, Lng: {point[1].toFixed(6)})
                                    </CustomListItem>
                                ))}
                            </List>

                        </div>
                    ) : (
                        <div style={{ marginTop: "20px" }}>
                            <CustomTextField
                                label="New Geofence Name"
                                variant="outlined"
                                value={newGeofenceName}
                                onChange={(e) => setNewGeofenceName(e.target.value)}
                            />

                            <CustomTextField style={{ marginTop: '10px' }}
                                label="Type"
                                variant="outlined"
                                value={newGeofenceType}
                                onChange={(e) => setNewGeofenceType(e.target.value)}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddGeofence}
                                style={{ marginTop: "10px" }}
                            >
                                Add New Geofence
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeofencingPage;
