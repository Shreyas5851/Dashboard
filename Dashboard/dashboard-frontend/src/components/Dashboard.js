import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';

const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState('Overview');

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', background: '#2c3e50' }}>
        <Sidebar onSelectCompany={handleSelectCompany} />
      </div>
      <div style={{ width: '80%', padding: '20px', background: '#1c1c1c', color: '#ecf0f1' }}>
        {selectedCompany === 'Overview' ? <Overview /> : <div>{selectedCompany} Details</div>}
      </div>
    </div>
  );
};

export default Dashboard;
