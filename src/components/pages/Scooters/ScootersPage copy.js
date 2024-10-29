import React, { useState } from 'react';
import FilterForm from '../../reusableComponents/FilterForm'; // Assume this file path is correct
import CustomTable from '../../reusableComponents/CustomTable'; // Assume this file path is correct
import './ScootersPage.css';


const ScooterPage = () => {
    // Define state variables for filters
    const [search, setSearch] = useState('');
    const [imei, setIMEI] = useState('');
    const [charging, setCharging] = useState(false);
    const [broken, setBroken] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [lost, setLost] = useState(false);

    // Function to handle filtering
    const applyFilters = () => {
        // Logic to filter the table based on selected filters
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
                    { label: 'Filter', placeholder: 'search...', onChange: setSearch },
                    { label: 'Filter (IMEI)', placeholder: 'search by imei...', onChange: setIMEI }
                ]}
                checkboxes={[
                    { label: 'Charging', onChange: setCharging },
                    { label: 'Broken', onChange: setBroken },
                    { label: 'Maintenance', onChange: setMaintenance },
                    { label: 'Blocked', onChange: setBlocked },
                    { label: 'Lost', onChange: setLost }
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
                    { label: 'QR Code', field: 'qrCode' },
                    { label: 'Serial number', field: 'serialNumber' },
                    { label: 'Warehouse', field: 'warehouse' },
                    { label: 'Mechanic name', field: 'mechanicName' },
                    { label: 'Not found', field: 'notFound' },
                    { label: 'Register date', field: 'registerDate' },
                    { label: 'LastSignInDate', field: 'lastSignInDate' },
                    { label: 'Last heart beat date', field: 'lastHeartbeatDate' },
                    { label: 'Totals', field: 'totals' },
                    { label: 'Last ride', field: 'lastRide' },
                    { label: 'Store', field: 'store' },
                    { label: 'Regions', field: 'regions' },
                    { label: 'Rentable', field: 'rentable' },
                    { label: 'Ready for rent', field: 'readyForRent' },
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
                apiEndpoint="/api/scooters" // Replace with actual endpoint
                filters={[
                    { field: 'search', value: search },
                    { field: 'imei', value: imei },
                    { field: 'charging', value: charging },
                    { field: 'broken', value: broken },
                    { field: 'maintenance', value: maintenance },
                    { field: 'blocked', value: blocked },
                    { field: 'lost', value: lost }
                ]}
            />
        </div>
    );
};

export default ScooterPage;