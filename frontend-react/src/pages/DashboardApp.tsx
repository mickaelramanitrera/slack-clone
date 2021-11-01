/* eslint-disable react/jsx-one-expression-per-line */
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import useUserConnected from '../hooks/useUserConnected';
// components
import Page from '../components/Page';
// import {
//   AppTasks,
//   AppNewUsers,
//   AppBugReports,
//   AppItemOrders,
//   AppNewsUpdate,
//   AppWeeklySales,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { user } = useUserConnected();

  return (
    <Page title="Dashboard | Slack Clone">
      <Container maxWidth="xl">
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4">Hi, Welcome back {user?.username || 'unknown'}</Typography>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Typography variant="subtitle2">Please choose a channel or create one to start chatting</Typography>
        </Box>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid> */}
      </Container>
    </Page>
  );
}
