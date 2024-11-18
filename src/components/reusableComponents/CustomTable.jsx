// CustomTable.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import axios from 'axios';

const CustomTable = forwardRef(({ columns, apiEndpoint, filters, sumFields = null }, ref) => {
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
        let newFilteredData = [...data];
    
        filters.forEach((filter) => {
            if (filter.type === 'range' && filter.rangeType === 'date' && filter.value) {
                const { min, max } = filter.value;
    
                newFilteredData = newFilteredData.filter((item) => {
                    const fieldValue = new Date(item[filter.field]);
                    if (isNaN(fieldValue.getTime())) return false;
    
                    return (
                        (min ? new Date(min) <= fieldValue : true) &&
                        (max ? fieldValue <= new Date(max) : true)
                    );
                });
            } else if (filter.type === 'range' && filter.rangeType === 'value' && filter.value) {
                const { min, max } = filter.value;
    
                newFilteredData = newFilteredData.filter((item) => {
                    const fieldValue = parseFloat(item[filter.field]);
                    if (isNaN(fieldValue)) return false;
    
                    return (
                        (min === null || fieldValue >= min) &&
                        (max === null || fieldValue <= max)
                    );
                });
            } else if (filter.value) {
                newFilteredData = newFilteredData.filter((item) =>
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
    
    // Expose the updateTable function to the parent via the ref
    useImperativeHandle(ref, () => ({
        updateTable,
    }));

    // Helper function to get nested field values using dot notation
    const getFieldValue = (row, fieldPath) => {
        return fieldPath.split('.').reduce((acc, key) => (acc ? acc[key] : 0), row);
    };

    const calculateSum = (row) => {
        if (sumFields) {
            return sumFields.fields.reduce((acc, field) => {
                return acc + (parseFloat(getFieldValue(row, field)) || 0);
            }, 0).toFixed(2);
        }
        return null;
    };

    return (
        <div className="custom-table">
            {/* <button onClick={updateTable}>Update Table</button> */}
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.label}</th>
                        ))}
                        {sumFields && <th>{sumFields.label}</th>}
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
                            {sumFields && (
                                <td>{calculateSum(row)}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default CustomTable;
