// HandleApproval.js
import React from 'react';
import axios from 'axios';

const HandleApproval = ({ customerId }) => {
    const handleApproval = async () => {
        try {
            await axios.put(`/api/customer/${customerId}/status`, { status: 'approved' });
            alert('Customer approved successfully');
            // Refresh the table by simulating a click on the update button
            document.querySelector('.custom-table button').click();
        } catch (error) {
            console.error('Error approving customer:', error);
            alert('Failed to approve customer');
        }
    };

    return (
        <button onClick={handleApproval} style={{ backgroundColor: 'green' }}>Approve</button>
    );
};

export default HandleApproval;
