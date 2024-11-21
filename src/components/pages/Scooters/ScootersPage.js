import React, { useState, useRef, useEffect } from 'react';
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
    // console.log("Base URL:", baseURL);

    // useRef object for child refrencing functionality
    const tableRef = useRef();
    // Handle Refresh
    const handleRefresh = () => {
        if (tableRef.current) {
            tableRef.current.updateTable();
        }
        console.log('Refreshing table data...');
        applyFilters(); // Reapply filters after refreshing data
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
    };



    const stateSetters = {
        batteryLevel: [setBatteryLevelMin, setBatteryLevelMax],
        createdAt: [setCreatedAtMin, setCreatedAtMax],
        // Add other fields here
    };

    const handleRangeChange = (field, range, type = 'value') => {
        const min =
            type === 'date'
                ? range.min
                    ? new Date(new Date(range.min).setHours(0, 0, 0, 0)).toISOString()
                    : ''
                : range.min || '';
        const max =
            type === 'date'
                ? range.max
                    ? new Date(new Date(range.max).setHours(23, 59, 59, 999)).toISOString()
                    : ''
                : range.max || '';

        const [setMin, setMax] = stateSetters[field] || [];

        if (setMin && setMax) {
            setMin(min);
            setMax(max);
            applyFilters();
        } else {
            console.warn(`No state setters defined for field: ${field}`);
        }
    };





    // Automatically update filters when filter state changes
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            const activeFilters = [
                { field: 'id', value: id },
                { field: 'serialNumber', value: serialNumber },
                { field: 'longitude', value: longitude },
                { field: 'latitude', value: latitude },
                { field: 'batteryHealth', value: batteryHealth },
                { field: 'lastMaintenance', value: lastMaintenance },
                { field: 'status', value: status },
                { field: 'location', value: location },
            ];

            if (batteryLevelMin || batteryLevelMax) {
                activeFilters.push({
                    field: 'batteryLevel',
                    type: 'range',
                    rangeType: 'value',
                    value: { min: batteryLevelMin || null, max: batteryLevelMax || null },
                });
            }

            if (createdAtMin || createdAtMax) {
                activeFilters.push({
                    field: 'createdAt',
                    type: 'range',
                    rangeType: 'date',
                    value: { min: createdAtMin || null, max: createdAtMax || null },
                });
            }

            setFilters(activeFilters.filter(Boolean));
        }, 300); // 300ms debounce delay

        // Cleanup timeout on value change
        return () => clearTimeout(debounceTimeout);
    }, [
        id,
        serialNumber,
        longitude,
        latitude,
        batteryHealth,
        lastMaintenance,
        status,
        location,
        batteryLevelMin,
        batteryLevelMax,
        createdAtMin,
        createdAtMax,
    ]);


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

            <div style={{ display: "flex", flexDirection: "column" }}>
                <h2>Scooters</h2>
                <div className='form-and-table-container'>
                    <FilterForm
                        fields={[
                            // { label: 'Created At', type: 'date', onChange: setCreatedAt },
                            { label: 'Updated At', type: 'date', onChange: setUpdatedAt },
                            { label: 'Serial Number', placeholder: 'Filter by Serial Number', onChange: setSerialNumber },
                            { label: 'Battery Health', placeholder: 'Battery Health', onChange: setBatteryHealth },
                            // { label: 'Battery Level', placeholder: 'Battery Level', onChange: setBatteryLevel },
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
                            { label: 'Export table', color: 'green', action: 'exportTable' },
                            { label: 'Add scooter', color: 'green', action: 'addScooter' },
                        ]}
                        onFilter={applyFilters}
                        onAction={handleAction}
                    />

                    <CustomTable
                        ref={tableRef}
                        columns={[
                            // { label: 'ID', field: 'id' },
                            { label: 'Created At', field: 'createdAt' },
                            { label: 'Updated At', field: 'updatedAt' },
                            { label: 'Serial Number', field: 'serialNumber' },
                            { label: 'Battery Health', field: 'batteryHealth' },
                            { label: 'Battery Level', field: 'batteryLevel' },
                            { label: 'Last Maintenance', field: 'lastMaintenance' },
                            { label: 'Status', field: 'status' },
                            {
                                label: 'Location',
                                field: 'location',
                                render: (row) => row.location?.name || 'N/A', // Access location name and handle any potential null/undefined cases
                            },
                            {
                                label: 'Action',
                                render: (row) => (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <button style={{ backgroundColor: '#024CAA', width: "100%" }}>View</button>
                                        <button style={{ backgroundColor: '#23006e' }} onClick={() => openEditModal(row)}>
                                            Edit
                                        </button>
                                        {/* <button style={{ backgroundColor: 'orange' }}>QR Code</button> */}
                                    </div>
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
