// material
import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Box, Grid, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from '../redux/store';
import { fetchChannelsAsync } from '../redux/slices/channels';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppTrafficBySite,
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const gqlClient = useApolloClient();
  const dispatch = useDispatch();
  const channels = useSelector(({ channels }) => channels.channels || []);
  useEffect(() => {
    if (channels.length === 0) {
      dispatch(fetchChannelsAsync({ graphql: gqlClient }));
    }
  }, []);

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
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
