import React from 'react';
import { Grid2 as Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import IncidentsOverview from './components/IncidentsOverview';
import PieSupport from './components/PieSupport';
import FetchAIData from './components/FetchAIData';
import MonthlyIncidents from './components/MonthlyIncidents';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <IncidentsOverview />
          </Grid>
          <Grid item size={{ xs: 6}}>
            <MonthlyIncidents />
          </Grid>
          {/* <Grid item size={{ xs: 12, lg: 8 }}>
            <FetchAIData />
          </Grid> */}
          <Grid item size={{ xs: 6 }}>
            <PieSupport />
          </Grid>
          {/* <Grid item size={{ xs: 12 }}>
            <RecentTransactions />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
