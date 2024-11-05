// DashboardPage.js
import React from 'react';
import TotalAvailableScooters from './TotalAvailableScooters';
import TotalRents from './TotalRents';
import CustomChart from '../../reusableComponents/CustomChart';
import './DashboardPage.css';

const baseURL = process.env.REACT_APP_API_BASE_URL;


const DashboardPage = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-row">
                <TotalAvailableScooters />
                <TotalRents />
            </div>
            <div className="dashboard-row">
                <div className="card">
                    <CustomChart 
                        apiUrl={`${baseURL}/user-registrations`}
                        type="line"
                        label="User Registrations"
                        color="rgb(75, 192, 192)"
                        xField="date"
                        yField="registrations"
                        xTitle="Date"
                        yTitle="Registrations"
                        axesColor="#333"
                    />
                </div>
                <div className="card">
                    <CustomChart 
                        apiUrl={`${baseURL}/total-duration`}
                        type="bar"
                        label="Total Duration"
                        color="rgb(255, 99, 132)"
                        xField="date"
                        yField="duration"
                        xTitle="Date"
                        yTitle="Duration (hours)"
                        axesColor="#333"
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
