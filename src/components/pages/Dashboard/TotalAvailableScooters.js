import React, { useState, useEffect } from 'react';
import CustomTable from '../../reusableComponents/CustomTable';
import FilterForm from '../../reusableComponents/FilterForm';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const TotalAvailableScooters = () => {
    const [locationFilter, setLocationFilter] = useState('');
    const [locations, setLocations] = useState([{ label: 'All', value: '' }]);

    const columns = [
        { label: 'Scooter ID', field: 'scooterId' },
        { label: 'Location', field: 'location' },
        { label: 'Battery Level', field: 'batteryLevel' },
    ];

    // Fetch location options and populate dropdown dynamically
    useEffect(() => {
        axios.get(`${baseURL}/available_scooters`)
            .then(response => {
                const locationSet = new Set(response.data.map(scooter => scooter.location));
                const locationOptions = Array.from(locationSet).map(location => ({
                    label: location,
                    value: location
                }));
                setLocations([{ label: 'All', value: '' }, ...locationOptions]);
            })
            .catch(error => console.error('Error fetching scooter data:', error));
    }, []);

    const handleLocationChange = (value) => {
        setLocationFilter(value);
    };

    const fields = [
        {
            label: 'Location',
            type: 'select',
            options: locations,
            onChange: handleLocationChange,
        },
    ];

    const filters = [
        { field: 'location', value: locationFilter },
    ];

    const handleFilter = () => {
        // No additional logic required here; the state update triggers the table update
    };

    return (
        <div className="card">
            <h3>Total Available Scooters</h3>
            <FilterForm fields={fields} onFilter={handleFilter} />
            <CustomTable columns={columns} apiEndpoint={`${baseURL}/available_scooters`} filters={filters} />
        </div>
    );
};

export default TotalAvailableScooters;
