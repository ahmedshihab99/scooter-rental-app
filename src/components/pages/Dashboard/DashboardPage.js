// DashboardPage.js
import React from 'react';
import TotalAvailableScooters from './TotalAvailableScooters';
import TotalRents from './TotalRents';
import './DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-row">
                <TotalAvailableScooters />
                <TotalRents />
            </div>
            <div className="dashboard-row">
                <div className="card">
                    <h3>Total User Registrations</h3>
                    <div className="chart-placeholder">Line Chart</div>
                </div>
                <div className="card">
                    <h3>Total Duration</h3>
                    <div className="chart-placeholder">Bars</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
