// CustomersRegistryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomTable from '../../reusableComponents/CustomTable';
import HandleApproval from './HandleApproval';
import HandleReject from './HandleReject';
import './CustomersRegistryPage.css';

const baseURL = process.env.REACT_APP_API_BASE_URL;
const apiEndpoint = `${baseURL}/customers_requests`;

const CustomersRegistryPage = () => {
    const [pendingCustomers, setPendingCustomers] = useState([]);
    const [approvedCustomers, setApprovedCustomers] = useState([]);
    const [rejectedCustomers, setRejectedCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;

                // Filter customers based on their status
                setPendingCustomers(data.filter(customer => customer.status === 'pending'));
                setApprovedCustomers(data.filter(customer => customer.status === 'approved'));
                setRejectedCustomers(data.filter(customer => customer.status === 'rejected'));
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, []);

    // Define columns for each table
    const commonColumns = [
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Request Date', field: 'requestDate' },
    ];

    const pendingColumns = [
        ...commonColumns,
        {
            label: 'Actions',
            render: (row) => (
                <div>
                    <HandleApproval customerId={row.id} />
                    <HandleReject customerId={row.id} />
                </div>
            ),
        },
    ];

    const registeredColumns = [
        ...commonColumns,
        {
            label: 'Actions',
            render: (row) => (
                <div>
                    <HandleReject customerId={row.id} />
                </div>
            ),
        },
    ];

    const rejectedColumns = [
        ...commonColumns,
        {
            label: 'Actions',
            render: (row) => (
                <div>
                    <HandleApproval customerId={row.id} />
                </div>
            ),
        },
    ];

    return (
        <div className="customers-registry-page">
            <h1>Customer Registry</h1>
            <div style={{ display: 'flex' }}>
                <div className="table-section">
                    <h2>Pending Customer Requests</h2>
                    <CustomTable columns={pendingColumns} apiEndpoint={apiEndpoint} filters={[{ field: 'status', value: 'pending' }]} />
                </div>

                <div className="table-section">
                    <h2>Registered Customers</h2>
                    <CustomTable columns={registeredColumns} apiEndpoint={apiEndpoint} filters={[{ field: 'status', value: 'approved' }]} />
                </div>

                <div className="table-section">
                    <h2>Rejected Customers</h2>
                    <CustomTable columns={rejectedColumns} apiEndpoint={apiEndpoint} filters={[{ field: 'status', value: 'rejected' }]} />
                </div>
            </div>

        </div>
    );
};

export default CustomersRegistryPage;
