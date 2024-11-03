import React, { useState } from 'react';
import './ScooterEditModal.css';

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
        location: scooter.location,
    });

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle the update action
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://10.0.0.22:8090/api/scooters/${scooter.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

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
            const response = await fetch(`http://10.0.0.22:8090/api/scooters/${scooter.id}`, {
                method: 'DELETE',
            });

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
                    <input type="text" name="createdAt" value={formData.createdAt} onChange={handleChange} placeholder="Created At" />
                    <input type="text" name="updatedAt" value={formData.updatedAt} onChange={handleChange} placeholder="Updated At" />
                    <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Serial Number" />
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
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
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
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
