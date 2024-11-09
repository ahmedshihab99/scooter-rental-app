// HandleReject.js
import React from 'react';
import axios from 'axios';

const HandleReject = ({ customerId }) => {
    const handleRejection = async () => {
        try {
            await axios.put(`/api/customer/${customerId}/status`, { status: 'rejected' });
            alert('Customer rejected successfully');
            // Refresh the table by simulating a click on the update button
            document.querySelector('.custom-table button').click();
        } catch (error) {
            console.error('Error rejecting customer:', error);
            alert('Failed to reject customer');
        }
    };

    return (
        <button onClick={handleRejection} style={{ backgroundColor: 'red' }}>Reject</button>
    );
};

export default HandleReject;
