import { useState } from "react";

const usePointOperations = ({ selectedGeofence, setSelectedGeofence, originalGeofenceCoordinates  }) => {
    const [isListeningForPoint, setIsListeningForPoint] = useState(false);
    const [editingPointIndex, setEditingPointIndex] = useState(null);
    const [pointToDeleteIndex, setPointToDeleteIndex] = useState(null);
    
    const [isAddingAPoint, setIsAddingAPoint] = useState(false);
    

    const handleStartListeningForPoint = () => {
        setIsListeningForPoint(true);
        setEditingPointIndex(null);
        setPointToDeleteIndex(null);
    };

    const handleCancelListening = () => {
        setIsListeningForPoint(false);
    };

    const handlePointAdded = (point) => {
        if (selectedGeofence && isListeningForPoint) {
            if (editingPointIndex !== null) {
                const updatedCoordinates = [...selectedGeofence.coordinates];
                updatedCoordinates[editingPointIndex] = point;
                setSelectedGeofence({
                    ...selectedGeofence,
                    coordinates: updatedCoordinates,
                });
                setEditingPointIndex(null);
            } else {
                setSelectedGeofence({
                    ...selectedGeofence,
                    coordinates: [...selectedGeofence.coordinates, point],
                });
            }
            setIsListeningForPoint(false);
        }
    };

    const handleEditPoint = (index) => {
        setIsListeningForPoint(true);
        setEditingPointIndex(index);
    };

    const handleDeletePoint = () => {
        if (pointToDeleteIndex !== null && selectedGeofence) {
            const updatedCoordinates = selectedGeofence.coordinates.filter((_, index) => index !== pointToDeleteIndex);
            setSelectedGeofence({
                ...selectedGeofence,
                coordinates: updatedCoordinates,
            });
            setPointToDeleteIndex(null);
        }
    };
    
    const handleClearNewCoordinates = () => {
        if (selectedGeofence && selectedGeofence.coordinates.length > originalGeofenceCoordinates.length) {
            setSelectedGeofence((prevGeofence) => ({
                ...prevGeofence,
                coordinates: originalGeofenceCoordinates, // reset to original points only
            }));
        }
    };
    
    const handleClearCoordinates = () => {
        setSelectedGeofence((prevGeofence) => ({
            ...prevGeofence,
            coordinates: [],
        }));
    };
    
    
    
    

    return {
        isListeningForPoint,
        handleStartListeningForPoint,
        handleCancelListening,
        handlePointAdded,
        handleEditPoint,
        handleDeletePoint,
    };
};

export default usePointOperations;
