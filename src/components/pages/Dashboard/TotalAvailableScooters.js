// TotalAvailableScooters.js
import React from 'react';
import CustomTable from '../../reusableComponents/CustomTable';

const TotalAvailableScooters = () => {
    const columns = [
        { label: 'Scooter ID', field: 'scooter_id' },
        { label: 'Location', field: 'location' },
        { label: 'Battery Level', field: 'battery_level' },
    ];

    return (
        <div className="card">
            <h3>Total Available Scooters</h3>
            <CustomTable columns={columns} apiEndpoint="/api/available-scooters" filters={[]} />
        </div>
    );
};

export default TotalAvailableScooters;
