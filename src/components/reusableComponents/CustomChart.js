// CustomChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, LineController, BarController, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary controllers and elements
Chart.register(LineController, BarController, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const CustomChart = ({ 
    apiUrl, // URL to fetch data
    type = 'line', // Chart type
    label = 'Dataset', // Dataset label
    color = 'rgb(75, 192, 192)', // Color of the dataset line/bar
    xTitle = 'X Axis', // Title for x-axis
    yTitle = 'Y Axis', // Title for y-axis
    xField = 'date', // Field in the data for x-axis
    yField = 'value', // Field in the data for y-axis
    axesColor = '#333' // Color for axes and gridlines
}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const labels = data.map(entry => entry[xField]);
                const values = data.map(entry => entry[yField]);

                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(chartRef.current, {
                    type,
                    data: {
                        labels,
                        datasets: [
                            {
                                label,
                                data: values,
                                borderColor: color,
                                backgroundColor: color,
                                fill: type === 'line' ? false : true,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `${label} Over Time`,
                            },
                        },
                        scales: {
                            x: {
                                type: 'category',
                                title: {
                                    display: true,
                                    text: xTitle,
                                    color: axesColor,
                                },
                                // grid: {
                                //     color: axesColor,
                                // },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: yTitle,
                                    color: axesColor,
                                },
                                
                            },
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching or rendering chart data:", error);
            }
        };

        fetchData();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [apiUrl, type, label, color, xTitle, yTitle, xField, yField, axesColor]);

    return <canvas ref={chartRef} />;
};

export default CustomChart;
