// TotalRents.js
import React, { useState } from 'react';
import CustomTable from '../../reusableComponents/CustomTable';
import FilterForm from '../../reusableComponents/FilterForm';


const baseURL = process.env.REACT_APP_API_BASE_URL;


const TotalRents = () => {
    const [dateFilter, setDateFilter] = useState('');
    const columns = [
        { label: 'Rent ID', field: 'rentId' },
        { label: 'Scooter ID', field: 'scooterId' },
        { label: 'User ID', field: 'userId' },
        { label: 'Start Date', field: 'startDate' },
        { label: 'End Date', field: 'endDate' },
    ];

    const handleFilterChange = (value) => {
        setDateFilter(value);
    };

    const fields = [
        {
            label: 'Date',
            type: 'select',
            options: [
                { label: 'Today', value: 'today' },
                { label: 'Yesterday', value: 'yesterday' },
                { label: 'This Week', value: 'week' },
            ],
            onChange: handleFilterChange,
        },
    ];

    const filters = [
        { field: 'date', value: dateFilter },
    ];

    return (
        <div className="card">
            <h3>Total Rents</h3>
            <FilterForm fields={fields} onFilter={() => { }} />
            <CustomTable columns={columns} apiEndpoint={`${baseURL}/rent_list`} filters={filters} />
        </div>
    );
};

export default TotalRents;
