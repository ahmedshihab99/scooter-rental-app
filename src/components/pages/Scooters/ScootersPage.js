import React, { useState } from 'react';
import FilterForm from '../../reusableComponents/FilterForm'; // Ensure this path is correct
import CustomTable from '../../reusableComponents/CustomTable'; // Ensure this path is correct
import ScooterEditModal from './compnents/ScooterEditModal'; // Corrected the path
import AddScooterModal from './compnents/AddScooterModal'; // Corrected the path

import './ScootersPage.css';

const ScooterPage = () => {
    // State variables for filters
    const [id, setId] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [batteryHealth, setBatteryHealth] = useState('');
    const [batteryLevel, setBatteryLevel] = useState('');
    const [lastMaintenance, setLastMaintenance] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [filters, setFilters] = useState([]);

    // Modals state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedScooter, setSelectedScooter] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Function to open the Add Scooter modal
    const openAddModal = () => setIsAddModalOpen(true);

    // Function to close the Add Scooter modal
    const closeAddModal = () => setIsAddModalOpen(false);

    // Function to refresh the table after adding a scooter
    const handleAddScooter = () => {
        closeAddModal();
        refreshTable(); // Ensure data consistency by re-fetching the table
    };

    // Function to open the Edit Scooter modal
    const openEditModal = (scooter) => {
        setSelectedScooter(scooter);
        setIsEditModalOpen(true);
    };

    // Function to close the Edit Scooter modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedScooter(null);
    };

    // Function to refresh the table after update
    const handleUpdate = () => {
        closeEditModal();
        refreshTable(); // Ensure the table refreshes
    };

    // Function to re-fetch data (mock example)
    const refreshTable = () => {
        // Logic to re-fetch the data goes here. E.g., make a new API call.
        console.log('Refreshing table data...');
        applyFilters(); // Reapply filters after refreshing data
    };

    // Apply filters based on state values
    const applyFilters = () => {
        setFilters([
            { field: 'id', value: id },
            { field: 'createdAt', value: createdAt },
            { field: 'updatedAt', value: updatedAt },
            { field: 'serialNumber', value: serialNumber },
            { field: 'longitude', value: longitude },
            { field: 'latitude', value: latitude },
            { field: 'batteryHealth', value: batteryHealth },
            { field: 'batteryLevel', value: batteryLevel },
            { field: 'lastMaintenance', value: lastMaintenance },
            { field: 'status', value: status },
            { field: 'location', value: location },
        ]);
    };

    // Handle different action buttons
    const handleAction = (action) => {
        switch (action) {
            case 'updateAddresses':
                console.log('Updating addresses...');
                break;
            case 'zoneReport':
                console.log('Generating zone report...');
                break;
            case 'exportAll':
                console.log('Exporting all data...');
                break;
            case 'exportTable':
                console.log('Exporting table data...');
                break;
            case 'addScooter':
                openAddModal();
                break;
            default:
                console.warn('Unhandled action:', action);
                break;
        }
    };

    return (
        <div className="scooter-page">
            <h2>Scooters</h2>

            <FilterForm
                fields={[
                    { label: 'ID', placeholder: 'Filter by ID', onChange: setId },
                    { label: 'Created At', type: 'date', onChange: setCreatedAt },
                    { label: 'Updated At', type: 'date', onChange: setUpdatedAt },
                    { label: 'Serial Number', placeholder: 'Filter by Serial Number', onChange: setSerialNumber },
                    { label: 'Longitude', placeholder: 'Filter by Longitude', onChange: setLongitude },
                    { label: 'Latitude', placeholder: 'Filter by Latitude', onChange: setLatitude },
                    { label: 'Battery Health', placeholder: 'Battery Health', onChange: setBatteryHealth },
                    { label: 'Battery Level', placeholder: 'Battery Level', onChange: setBatteryLevel },
                    { label: 'Last Maintenance', type: 'date', onChange: setLastMaintenance },
                    {
                        label: 'Status',
                        type: 'select',
                        options: [
                            { label: 'AVAILABLE', value: 'AVAILABLE' },
                            { label: 'IN_USE', value: 'IN_USE' },
                            { label: 'None', value: '' },
                        ],
                        onChange: setStatus,
                    },
                    { label: 'Location', placeholder: 'Filter by Location', onChange: setLocation },
                ]}
                buttons={[
                    { label: 'Update addresses', color: 'green', action: 'updateAddresses' },
                    { label: 'Zone report', color: 'green', action: 'zoneReport' },
                    { label: 'Export all', color: 'green', action: 'exportAll' },
                    { label: 'Export table', color: 'green', action: 'exportTable' },
                    { label: 'Add scooter', color: 'green', action: 'addScooter' },
                ]}
                onFilter={applyFilters}
                onAction={handleAction}
            />

            <CustomTable
                columns={[
                    { label: 'ID', field: 'id' },
                    { label: 'Created At', field: 'createdAt' },
                    { label: 'Updated At', field: 'updatedAt' },
                    { label: 'Serial Number', field: 'serialNumber' },
                    { label: 'Longitude', field: 'longitude' },
                    { label: 'Latitude', field: 'latitude' },
                    { label: 'Battery Health', field: 'batteryHealth' },
                    { label: 'Battery Level', field: 'batteryLevel' },
                    { label: 'Last Maintenance', field: 'lastMaintenance' },
                    { label: 'Status', field: 'status' },
                    { label: 'Location', field: 'location' },
                    {
                        label: 'Action',
                        render: (row) => (
                            <>
                                <button style={{ backgroundColor: 'green' }}>View</button>
                                <button style={{ backgroundColor: 'blue' }} onClick={() => openEditModal(row)}>
                                    Edit
                                </button>
                                <button style={{ backgroundColor: 'orange' }}>QR Code</button>
                            </>
                        ),
                    },
                ]}
                apiEndpoint="http://10.0.0.22:8090/api/scooters"
                filters={filters}
            />

            {isEditModalOpen && (
                <ScooterEditModal scooter={selectedScooter} onClose={closeEditModal} onUpdate={handleUpdate} />
            )}

            {isAddModalOpen && <AddScooterModal onClose={closeAddModal} onAdd={handleAddScooter} />}
        </div>
    );
};

export default ScooterPage;
