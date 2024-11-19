import React, { useState, useRef } from 'react';
import FilterForm from '../../reusableComponents/FilterForm'; // Ensure this path is correct
import CustomTable from '../../reusableComponents/CustomTable'; // Ensure this path is correct
import ScooterEditModal from './components/ScooterEditModal'; // Corrected the path
import AddScooterModal from './components/AddScooterModal'; // Corrected the path

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

    const [batteryLevelMin, setBatteryLevelMin] = useState('');
    const [batteryLevelMax, setBatteryLevelMax] = useState('');

    const [createdAtMin, setCreatedAtMin] = useState('');
    const [createdAtMax, setCreatedAtMax] = useState('');

    const [lastMaintenance, setLastMaintenance] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [filters, setFilters] = useState([]);

    // Modals state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedScooter, setSelectedScooter] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const baseURL = process.env.REACT_APP_API_BASE_URL;

    // useRef object for child referencing functionality
    const tableRef = useRef();

    // Handle Refresh
    const handleRefresh = () => {
        if (tableRef.current) {
            tableRef.current.updateTable();
        }
        console.log('Refreshing table data...');
    };

    // Function to open the Add Scooter modal
    const openAddModal = () => setIsAddModalOpen(true);

    // Function to close the Add Scooter modal
    const closeAddModal = () => setIsAddModalOpen(false);

    // Function to refresh the table after adding a scooter
    const handleAddScooter = () => {
        closeAddModal();
        handleRefresh(); // Ensure data consistency by re-fetching the table
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
        handleRefresh(); // Ensure the table refreshes
    };

    // Apply filters based on state values
    const applyFilters = () => {
        const activeFilters = [
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
            {
                field: 'createdAt',
                type: 'range',
                rangeType: 'date',
                value: { min: createdAtMin || null, max: createdAtMax || null },
            },
            {
                field: 'batteryLevel',
                type: 'range',
                rangeType: 'value',
                value: { min: batteryLevelMin || null, max: batteryLevelMax || null },
            },
        ].filter(Boolean); // Remove any null or undefined filters

        setFilters(activeFilters);

        console.log('Filters applied:', activeFilters);
    };

    const handleRangeChange = (field, range, type = 'value') => {
        const min = range.min || '';
        const max =
            type === 'date'
                ? range.max
                    ? new Date(new Date(range.max).setHours(23, 59, 59, 999)).toISOString()
                    : ''
                : range.max || '';

        if (field === 'batteryLevel') {
            setBatteryLevelMin(min);
            setBatteryLevelMax(max);
        } else if (field === 'createdAt') {
            setCreatedAtMin(min);
            setCreatedAtMax(max);
        } else {
            console.warn(`Unhandled range field: ${field}`);
        }
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>Scooters</h2>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                                    { label: 'REPAIRED', value: 'REPAIRED' },
                                    { label: 'MAINTENANCE', value: 'MAINTENANCE' },
                                    { label: 'OFFLINE', value: 'OFFLINE' },
                                    { label: 'None', value: '' },
                                ],
                                onChange: setStatus,
                            },
                            { label: 'Location', placeholder: 'Filter by Location', onChange: setLocation },
                            {
                                label: 'Battery Level Range',
                                type: 'range',
                                rangeType: 'value',
                                min: 0,
                                max: 100,
                                onRangeChange: (range) => handleRangeChange('batteryLevel', range),
                            },
                            {
                                label: 'Created At Range',
                                type: 'range',
                                rangeType: 'date',
                                onRangeChange: (range) => handleRangeChange('createdAt', range, 'date'),
                            },
                        ]}
                        buttons={[
                            { label: 'Filter', color: 'green', action: 'exportTable' },
                            { label: 'Zone report', color: 'green', action: 'zoneReport' },
                            { label: 'Export all', color: 'green', action: 'exportAll' },
                            { label: 'Add scooter', color: 'green', action: 'addScooter' },
                        ]}
                        onAction={handleAction}
                    />
                    <button onClick={applyFilters} className="apply-filters-button">
                        Apply Filters
                    </button>
                    <CustomTable
                        ref={tableRef}
                        columns={[
                            { label: 'Created At', field: 'createdAt' },
                            { label: 'Updated At', field: 'updatedAt' },
                            { label: 'Serial Number', field: 'serialNumber' },
                            { label: 'Longitude', field: 'longitude' },
                            { label: 'Latitude', field: 'latitude' },
                            { label: 'Battery Health', field: 'batteryHealth' },
                            { label: 'Battery Level', field: 'batteryLevel' },
                            { label: 'Last Maintenance', field: 'lastMaintenance' },
                            { label: 'Status', field: 'status' },
                            {
                                label: 'Location',
                                field: 'location',
                                render: (row) => row.location?.name || 'N/A',
                            },
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
                        apiEndpoint={`${baseURL}/scooters`} // Dynamically use baseURL
                        filters={filters}
                    />
                </div>
            </div>

            {isEditModalOpen && (
                <ScooterEditModal scooter={selectedScooter} onClose={closeEditModal} onUpdate={handleUpdate} />
            )}

            {isAddModalOpen && <AddScooterModal onClose={closeAddModal} onAdd={handleAddScooter} />}
        </div>
    );
};

export default ScooterPage;
