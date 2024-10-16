import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const Overview = () => {
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/overview')
      .then(response => setOverviewData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!overviewData) return <div>Loading...</div>;

  const pieData = {
    labels: ["Transformation Fund", "Orientation Fund", "Infrastructure Fund", "Rise Fund", "Partnership Fund"],
    datasets: [{
      data: Object.values(overviewData.committed_by_fund),
      backgroundColor: ['#3498db', '#9b59b6', '#e74c3c', '#2ecc71', '#f1c40f']
    }]
  };

  return (
    <div>
      <h1>Overview</h1>
      <h2>Total Capital Catalyzed: {overviewData.total_capital}</h2>
      <h2>Total Fund Investments: {overviewData.total_investments}</h2>
      <h2>Underlying Portfolio Companies: {overviewData.underlying_companies}</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Doughnut data={pieData} />
        {/* You can add more charts or data here */}
      </div>
    </div>
  );
};

export default Overview;
