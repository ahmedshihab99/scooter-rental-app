import React, { useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import './ScooterEditModal.css';

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/admin/scooters`;

const ScooterEditModal = ({ scooter, onClose, onUpdate }) => {
    // Initialize local state with current scooter details
    const [formData, setFormData] = useState({
        id: scooter.id,
        createdAt: scooter.createdAt,
        updatedAt: scooter.updatedAt,
        serialNumber: scooter.serialNumber,
        longitude: scooter.longitude,
        latitude: scooter.latitude,
        batteryHealth: scooter.batteryHealth,
        batteryLevel: scooter.batteryLevel,
        lastMaintenance: scooter.lastMaintenance,
        status: scooter.status,
        location: scooter.location || { name: "" },  // Initialize location as an object
    });

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "location") {
            setFormData({
                ...formData,
                location: { ...formData.location, name: value }, // Update location.name
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle the update action
    const handleUpdate = async () => {
        console.log(`scooter data is ${JSON.stringify(formData)}`);
        try {
            // const response = await fetch(`${API_URL}/${scooter.id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });
            
            const response = await axiosInstance.put(`${API_URL}/${scooter.id}`, formData);

            if (response.ok) {
                onUpdate(); // Refresh the table or pass any update callback
                onClose();
            } else {
                console.error('Failed to update scooter');
            }
        } catch (error) {
            console.error('Error updating scooter:', error);
        }
    };

    // Handle the delete action
    const handleDelete = async () => {
        try {
            // const response = await fetch(`${API_URL}/${scooter.id}`, {
            //     method: 'DELETE',
            // });
            
            const response = await axiosInstance.delete(`${API_URL}/${scooter.id}`);
            

            if (response.ok) {
                onUpdate(); // Refresh the table or pass any update callback
                onClose();
            } else {
                console.error('Failed to delete scooter');
            }
        } catch (error) {
            console.error('Error deleting scooter:', error);
        }
    };

    return (
        <div className="scooter-edit-modal">
            <div className="modal-content">
                <h3>Edit Scooter</h3>
                <form>
                    <label>ID: {formData.id}</label>
                    <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Serial Number" />
                    {/* <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" /> */}
                    <input type="text" name="batteryHealth" value={formData.batteryHealth} onChange={handleChange} placeholder="Battery Health" />
                    <input type="text" name="batteryLevel" value={formData.batteryLevel} onChange={handleChange} placeholder="Battery Level" />
                    <input type="text" name="lastMaintenance" value={formData.lastMaintenance} onChange={handleChange} placeholder="Last Maintenance" />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="IN_USE">IN_USE</option>
                        <option value="REPAIRED">REPAIRED</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                        <option value="OFFLINE">OFFLINE</option>
                    </select>
                    <input
                        type="text"
                        name="location"
                        value={formData.location?.name || ""}
                        onChange={handleChange}
                        placeholder="Location Name"
                    />

                </form>
                <div className="modal-buttons">
                    <button onClick={handleUpdate} style={{ backgroundColor: 'green' }}>Update</button>
                    <button onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</button>
                    <button onClick={onClose} style={{ backgroundColor: 'gray' }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ScooterEditModal;
