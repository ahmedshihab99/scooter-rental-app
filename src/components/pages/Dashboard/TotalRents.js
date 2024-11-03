// TotalRents.js
import React, { useState } from 'react';
import CustomTable from '../../reusableComponents/CustomTable';
import FilterForm from '../../reusableComponents/FilterForm';

const TotalRents = () => {
    const [dateFilter, setDateFilter] = useState('');
    const columns = [
        { label: 'Rent ID', field: 'rent_id' },
        { label: 'Scooter ID', field: 'scooter_id' },
        { label: 'User ID', field: 'user_id' },
        { label: 'Start Date', field: 'start_date' },
        { label: 'End Date', field: 'end_date' },
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
            <CustomTable columns={columns} apiEndpoint="/api/rents" filters={filters} />
        </div>
    );
};

export default TotalRents;
