import { Box, Grid, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from '../redux/store';
import Page from '../components/Page';

export default () => {
  const { id } = useParams();
  const channel = useSelector(({ channels }) => channels.channels.filter((channel) => channel.id === id)[0] || null);

  return (
    <Page title="Channel | Slack Clone">
      <Container maxWidth="xl">
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4">{channel?.name || 'Default Channel'}</Typography>
        </Box>
      </Container>
    </Page>
  );
};
