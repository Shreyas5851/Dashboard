"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2"; // Import Bar chart
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/overview');
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    // Prepare data for the pie chart
    const pieChartDataCommitted = {
        labels: Object.keys(data.committed_by_fund).map(fund => 
            fund.charAt(0).toUpperCase() + fund.slice(1).replace(/_/g, ' ')
        ),
        datasets: [
            {
                label: 'Committed Capital by Fund',
                data: Object.values(data.committed_by_fund),
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverOffset: 4,
            },
        ],
    };

    // Prepare data for the bar chart
    const barChartData = {
        labels: Object.keys(data.committed_by_fund).map(fund => 
            fund.charAt(0).toUpperCase() + fund.slice(1).replace(/_/g, ' ')
        ),
        datasets: [
            {
                label: 'Committed Capital by Fund',
                data: Object.values(data.committed_by_fund),
                backgroundColor: '#42A5F5',
            },
        ],
    };

    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Search for a company:</h2>
                <ul>
                    <li>Overview</li>
                    <li>CleanPower Ltd</li>
                    <li>EarthRenew Ltd</li>
                    <li>HydroFlow Ltd</li>
                    <li>GreenFuture Ltd</li>
                    <li>WindWorks Ltd</li>
                    <li>SolarWind Ltd</li>
                    <li>CarbonZero Ltd</li>
                    <li>GeoTherm Ltd</li>
                    <li>EcoTech Ltd</li>
                </ul>
            </div>

            <div className="content">
                <h1>Overview - alviridi</h1>
                <div className="metrics">
                    <div className="metric">
                        <p>Total Capital Catalyzed (S$):</p>
                        <h2>{data.total_capital}</h2>
                    </div>
                    <div className="metric">
                        <p>Total Fund Investments:</p>
                        <h2>{data.total_investments}</h2>
                    </div>
                    <div className="metric">
                        <p>Underlying Portfolio Companies:</p>
                        <h2>{data.underlying_companies}</h2>
                    </div>
                </div>

                <div className="charts">
                    <div className="chart">
                        <h2>Committed Capital by Fund (Pie)</h2>
                        <Pie data={pieChartDataCommitted} />
                    </div>
                    <div className="chart">
                        <h2>Committed Capital by Fund (Bar)</h2>
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .dashboard {
                    display: flex;
                    background-color: #121212;
                    color: white;
                    height: 100vh;
                    font-family: Arial, sans-serif;
                }

                .sidebar {
                    width: 20%;
                    background-color: #1e1e1e;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid #333;
                }

                .sidebar h2 {
                    color: #fff;
                    margin-bottom: 20px;
                }

                .sidebar ul {
                    list-style: none;
                    padding: 0;
                }

                .sidebar li {
                    margin: 10px 0;
                    color: #aaa;
                    cursor: pointer;
                }

                .sidebar li:hover {
                    color: #fff;
                }

                .content {
                    padding: 20px;
                    flex: 1;
                    overflow-y: auto;
                }

                .metrics {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 40px;
                }

                .metric {
                    background-color: #1e1e1e;
                    padding: 20px;
                    border-radius: 10px;
                    width: 30%;
                    text-align: center;
                }

                .metric h2 {
                    font-size: 2.5rem;
                    margin: 10px 0;
                }

                .charts {
                    display: flex;
                    justify-content: space-around; /* Change to space-around for better alignment */
                }

                .chart {
                    width: 45%; /* Change width to ensure both charts fit */
                }

                .chart h2 {
                    text-align: center;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}
