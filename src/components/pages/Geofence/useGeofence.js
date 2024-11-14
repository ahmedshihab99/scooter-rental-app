import { useState, useEffect } from "react";
import GeofenceService from "../../services/GeofenceService";

const useGeofence = () => {
    const [geofences, setGeofences] = useState([]);
    const [selectedGeofence, setSelectedGeofence] = useState(null);
    const [isAddingGeofence, setIsAddingGeofence] = useState(false);
    const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);
    const [newGeofenceName, setNewGeofenceName] = useState("");
    const [newGeofenceType, setNewGeofenceType] = useState("");

    const fetchGeofences = async () => {
        try {
            const response = await GeofenceService.getAllGeofences();
            setGeofences(response || []);
        } catch (error) {
            console.error("Error fetching geofence data:", error);
        }
    };

    const handleAddGeofence = () => {
        setIsAddingGeofence(true);
        setSelectedGeofence({ name: newGeofenceName, geofenceType: "", coordinates: [] });
        setIsEditingOrAdding(true);
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
            setNewGeofenceType("");
            setIsEditingOrAdding(false);
            await fetchGeofences();
        } catch (error) {
            console.error("Error saving geofence:", error);
        }
    };

    const handleEditGeofence = (geofence) => {
        setSelectedGeofence(geofence);
        setIsEditingOrAdding(true);
    };
    
    const handleUpdateGeofence = async () => {
        try {
            console.log(`the following is the SG ${selectedGeofence.geofenceType}`);
            await GeofenceService.updateGeofence(selectedGeofence.id, selectedGeofence); // PUT request
            setSelectedGeofence(null); // reset after updating
            await fetchGeofences(); // refresh list
        } catch (error) {
            console.error("Error updating geofence:", error);
        }
    };
    
    const handleCancelEditing = () => {
        setSelectedGeofence(null);
        setIsAddingGeofence(false);
        setNewGeofenceName("");
        setNewGeofenceType("");
        setIsEditingOrAdding(false); // Unlock existing geofences
    };

    useEffect(() => {
        fetchGeofences();
    }, []);

    return {
        geofences,
        selectedGeofence,
        isAddingGeofence,
        isEditingOrAdding,
        newGeofenceName,
        newGeofenceType,
        setNewGeofenceName,
        setNewGeofenceType,
        handleAddGeofence,
        handleSaveGeofence,
        handleEditGeofence,
    };
};

export default useGeofence;
