// AddScooterModal.js
import React, { useState } from 'react';
import './ScooterEditModal.css'; // Reusing CSS for styling

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/scooters`;

const AddScooterModal = ({ onClose, onAdd }) => {
    // State to hold the form input values
    const [formData, setFormData] = useState({
        serialNumber: '',
        longitude: '',
        latitude: '',
        batteryHealth: '',
        batteryLevel: '',
        lastMaintenance: '',
        status: 'AVAILABLE',
        location: 'Central Park', // Default location
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle the POST request to add a new scooter
    const handleAddScooter = async () => {
        try {
            // Prepare the request body without the `location` property
            const { location, serialNumber, longitude, latitude, batteryHealth, batteryLevel, lastMaintenance, status } = formData;

            // Construct the request body with proper data types
            const requestBody = {
                serialNumber,
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude),
                batteryHealth: parseInt(batteryHealth, 10),
                batteryLevel: parseInt(batteryLevel, 10),
                lastMaintenance,
                status,
            };

            const response = await fetch(`${API_URL}?locationName=${location}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert('Scooter added successfully!');
                onAdd(); // Refresh the table
                onClose(); // Close the modal
            } else {
                alert('Failed to add scooter. Please try again.');
            }
        } catch (error) {
            console.error('Error adding scooter:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="scooter-edit-modal">
            <div className="modal-content">
                <h3>Add New Scooter</h3>
                <form>
                    <input
                        type="text"
                        name="serialNumber"
                        placeholder="Serial Number"
                        value={formData.serialNumber}
                        onChange={handleChange}
                    />
                    {/* <input
                        type="text"
                        name="longitude"
                        placeholder="Longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="latitude"
                        placeholder="Latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                    /> */}
                    <input
                        type="text"
                        name="batteryHealth"
                        placeholder="Battery Health"
                        value={formData.batteryHealth}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="batteryLevel"
                        placeholder="Battery Level"
                        value={formData.batteryLevel}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="lastMaintenance"
                        placeholder="Last Maintenance"
                        value={formData.lastMaintenance}
                        onChange={handleChange}
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="IN_USE">IN_USE</option>
                        <option value="REPAIRED">REPAIRED</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                        <option value="OFFLINE">OFFLINE</option>
                    </select>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option value="Central Park">Central Park</option>
                        <option value="Cairo">Cairo</option>
                        <option value="Bayomi">Bayomi</option>
                    </select>
                </form>
                <div className="modal-buttons">
                    <button style={{ backgroundColor: 'green' }} onClick={handleAddScooter}>
                        Add
                    </button>
                    <button style={{ backgroundColor: 'red' }} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddScooterModal;
