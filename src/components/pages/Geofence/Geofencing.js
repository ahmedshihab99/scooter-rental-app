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
    const [isListeningForPoint, setIsListeningForPoint] = useState(false);

    const [pointToEditIndex, setPointToEditIndex] = useState(null);
    const [editingPointIndex, setEditingPointIndex] = useState(null);
    const [pointToDeleteIndex, setPointToDeleteIndex] = useState(null);
    const [originalGeofenceCoordinates, setOriginalGeofenceCoordinates] = useState([]);

    const [isAddingAPoint, setIsAddingAPoint] = useState(false);






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

    const handleStartListeningForPoint = () => {
        setIsListeningForPoint(true);
        setIsAddingAPoint(true); // New state to indicate a point is being added

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


    const handleUpdateGeofence = async () => {
        try {
            await GeofenceService.updateGeofence(selectedGeofence.id, selectedGeofence); // PUT request
            setSelectedGeofence(null); // reset after updating
            await fetchGeofences(); // refresh list
        } catch (error) {
            console.error("Error updating geofence:", error);
        }
    };



    const handleSaveGeofence = async () => {
        try {
            if (isAddingGeofence) {
                await GeofenceService.addGeofence(selectedGeofence);
                setIsAddingGeofence(false);
            } else {
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
        setOriginalGeofenceCoordinates([...geofence.coordinates]); // track original points
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
        setIsListeningForPoint(false);
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
                />




                <div className="geofence-control">
                    <List>
                        {geofences.map((geofence) => (
                            <CustomListItem
                                button
                                key={geofence.id}
                                onClick={() => handleEditGeofence(geofence)}
                            >
                                {geofence.name}
                            </CustomListItem>
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
