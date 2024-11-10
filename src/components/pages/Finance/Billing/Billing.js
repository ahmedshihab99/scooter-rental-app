// BillingPage.js
import React from 'react';
import CustomTable from '../../../reusableComponents/CustomTable'; // Ensure this path is correct
import './Billing.css'; // Add any custom styles you may need

const apiEndpoint = `${process.env.REACT_APP_API_BASE_URL}/billing_records`; // Replace with actual billing API endpoint

const BillingPage = () => {
    // Define columns based on the provided image
    const columns = [
        { label: 'Bill ID', field: 'billId' },
        { label: 'User ID', field: 'userId', hidden: true }, // Hidden on the front end
        { label: 'Scooter SN', field: 'scooterSN' },
        { label: 'Requesting Duration', field: 'requestingDuration' },
        { label: 'Starting Time', field: 'startingTime' },
        { label: 'Ending Time', field: 'endingTime' },
        { label: 'Total Duration', field: 'totalDuration' },
        { label: 'Starting Location', field: 'startingLocation' },
        { label: 'Ending Location', field: 'endingLocation' },
    ];

    // Define sum fields for the Renting Charge column with dot notation
    const sumFields = {
        label: 'Renting Charge',
        fields: ['rentingCharge.baseCharge', 'rentingCharge.extraDuration']
    };

    return (
        <div className="billing-page">
            <h1>Billing Records</h1>
            <CustomTable columns={columns} apiEndpoint={apiEndpoint} filters={[]} sumFields={sumFields} />
        </div>
    );
};

export default BillingPage;
