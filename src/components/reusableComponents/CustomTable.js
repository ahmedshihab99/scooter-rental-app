import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomTable = ({ columns, apiEndpoint, filters }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Initial data fetch
        axios.get(apiEndpoint)
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [apiEndpoint]);

    useEffect(() => {
        // Apply filters whenever filters prop changes
        let newFilteredData = [...data];
        filters.forEach(filter => {
            if (filter.value !== '' && filter.value !== false) { // Only apply non-empty filters
                newFilteredData = newFilteredData.filter(item =>
                    item[filter.field]?.toString().includes(filter.value.toString())
                );
            }
        });
        setFilteredData(newFilteredData);
    }, [filters, data]);

    const updateTable = () => {
        // Re-fetch or update table data
        axios.get(apiEndpoint)
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => console.error('Error updating table:', error));
    };

    return (
        <div className="custom-table">
            <button onClick={updateTable}>Update Table</button>
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.render ? column.render(row) : row[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
