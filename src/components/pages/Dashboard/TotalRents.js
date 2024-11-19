// TotalRents.js
import React, { useState } from 'react';
import CustomTable from '../../reusableComponents/CustomTable';
import FilterForm from '../../reusableComponents/FilterForm';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const TotalRents = () => {
    const [monthFilter, setMonthFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('2024'); // Set default year to 2024

    const columns = [
        { label: 'Rent ID', field: 'rentId' },
        { label: 'Scooter ID', field: 'scooterId' },
        { label: 'User ID', field: 'userId' },
        { label: 'Start Date', field: 'startDate' },
        { label: 'End Date', field: 'endDate' },
    ];

    const handleMonthChange = (value) => {
        setMonthFilter(value);
    };

    const handleYearChange = (value) => {
        setYearFilter(value);
    };

    // Month options for the dropdown
    const months = [
        { label: 'All', value: '' },
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];

    const fields = [
        {
            label: 'Year',
            type: 'input',
            placeholder: 'Enter Year (e.g., 2024)',
            onChange: handleYearChange,
            value: yearFilter, // Set value for the year input
        },
        {
            label: 'Month',
            type: 'select',
            options: months,
            onChange: handleMonthChange,
        },
    ];

    // Combine year and month filters into a single string for filtering by startDate
    const startDateFilter = yearFilter && monthFilter ? `${yearFilter}-${monthFilter}` : yearFilter || monthFilter;

    const filters = [
        { field: 'startDate', value: startDateFilter },
    ];

    return (
        <div className="card">
            <h3>Total Rents</h3>
            <div className="total-rents-filter-form">
                <FilterForm fields={fields} onFilter={() => { }} />

            </div>
            <CustomTable columns={columns} apiEndpoint={`${baseURL}/rent_list`} filters={filters} />
        </div>
    );
};

export default TotalRents;
