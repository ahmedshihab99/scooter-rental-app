import React, { useState } from 'react';
import FilterForm from '../../reusableComponents/FilterForm'; // Assume this file path is correct
import CustomTable from '../../reusableComponents/CustomTable'; // Assume this file path is correct
import './ScootersPage.css';

const ScooterPage = () => {
    // Define state variables for filters
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

    // Function to handle filtering
    const applyFilters = () => {
        // Set up filters based on current state
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

    // Function to handle action buttons
    const handleAction = (action) => {
        switch (action) {
            case 'updateAddresses':
                // Handle update addresses
                break;
            case 'zoneReport':
                // Handle zone report
                break;
            case 'exportAll':
                // Handle export all
                break;
            case 'exportTable':
                // Handle export table
                break;
            case 'addScooter':
                // Handle add scooter
                break;
            default:
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
                            { label: 'None', value: '' }
                        ],
                        onChange: setStatus
                    },
                    { label: 'Location', placeholder: 'Filter by Location', onChange: setLocation },
                ]}
                buttons={[
                    { label: 'Update addresses', color: 'green', action: 'updateAddresses' },
                    { label: 'Zone report', color: 'green', action: 'zoneReport' },
                    { label: 'Export all', color: 'green', action: 'exportAll' },
                    { label: 'Export table', color: 'green', action: 'exportTable' },
                    { label: 'Add scooter', color: 'green', action: 'addScooter' }
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
                                <button style={{ backgroundColor: 'blue' }}>Edit</button>
                                <button style={{ backgroundColor: 'orange' }}>QR Code</button>
                            </>
                        )
                    }
                ]}
                apiEndpoint="http://10.0.0.22:8090/api/scooters"
                filters={filters}
            />
        </div>
    );
};

export default ScooterPage;
