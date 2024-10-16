import React from 'react';
import { Button, List, ListItem } from '@mui/material';

const Sidebar = ({ onSelectCompany }) => {
  const companies = [
    "Overview", "CleanPower Ltd", "EarthRenew Ltd", "HydroFlow Ltd", "GreenFuture Ltd",
    "WindWorks Ltd", "SolarWind Ltd", "CarbonZero Ltd", "GeoTherm Ltd", "EcoTech Ltd"
  ];

  return (
    <List>
      {companies.map((company, index) => (
        <ListItem key={index}>
          <Button fullWidth onClick={() => onSelectCompany(company)}>
            {company}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
