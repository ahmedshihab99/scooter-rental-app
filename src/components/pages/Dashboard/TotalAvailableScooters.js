// TotalAvailableScooters.js
import React from 'react';
import CustomTable from '../../reusableComponents/CustomTable';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const TotalAvailableScooters = () => {
    const columns = [
        { label: 'Scooter ID', field: 'scooterId' },
        { label: 'Location', field: 'location' },
        { label: 'Battery Level', field: 'batteryLevel' },
    ];

    return (
        <div className="card">
            <h3>Total Available Scooters</h3>
            <CustomTable columns={columns} apiEndpoint={`${baseURL}/available_scooters`} filters={[]} />
        </div>
    );
};

export default TotalAvailableScooters;
