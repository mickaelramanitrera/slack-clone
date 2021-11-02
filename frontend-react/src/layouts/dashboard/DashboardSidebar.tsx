/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import useSnackbar from '../../hooks/useSnackbar';
import { useDispatch, useSelector } from '../../redux/store';
import { fetchUsersAsync, setConnected as setConnectedAction } from '../../redux/slices/app';
import { fetchChannelsAsync } from '../../redux/slices/channels';
import useUserConnected from '../../hooks/useUserConnected';
import useModal from '../../hooks/useModal';
import CreateChannelForm from '../../components/_dashboard/app/CreateChannelForm';
import GroupMenuSection, { getConfigForChannel, getChannelTitle } from '../../components/GroupMenuSection';
import { fetchMessagesThunk } from '../../redux/slices/messages';
import { IUser } from '../../types/user';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: (theme as any).shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

const scrollToBottomOfMessages = () => {
  setTimeout(() => {
    const objDiv = (document.getElementById('screen-message') as any) || { scrollTop: 0, scrollHeight: 0 };
    objDiv.scrollTop = objDiv?.scrollHeight || null;
  }, 700);
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: { [name: string]: any }) {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user, listenTo, clearListeners } = useUserConnected();
  const { openAlert } = useSnackbar();
  const gqlClient = useApolloClient();
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { channels, channelLoading, users, connectedUsers } = useSelector(({ channels, app }) => ({
    channels: channels.channels || [],
    channelLoading: channels.loading,
    users: app.users || [],
    connectedUsers: app.connectedUsers || {},
  }));
  async function handleRealtime(data: any) {
    const channel = channels.filter((chan) => parseInt(chan.id, 10) === data.data?.channel?.id)[0];
    const channelName = channel
      ? getChannelTitle(channel, user, connectedUsers, true)
      : data.data?.channel?.name || data.data?.name || '';
    // Handle new messages
    if (data.type === 'create') {
      if (id) {
        await dispatch(fetchMessagesThunk({ graphql: gqlClient, channelId: id }));
        scrollToBottomOfMessages();
      }
      openAlert(`New mesage in ${channelName}`, 'success');
    }

    // Handle new channel
    if (data.type === 'new') {
      dispatch(fetchUsersAsync({ graphql: gqlClient }));
      dispatch(fetchChannelsAsync({ graphql: gqlClient, userId: user?.id || 0 }));
      openAlert('New channel', 'success');
    }
  }
  useEffect(() => {
    if (channels.length === 0) {
      dispatch(fetchChannelsAsync({ graphql: gqlClient, userId: user?.id || 0 }));
    }
  }, []);
  useEffect(() => {
    const beatHeart = () => {
      const publication = (window as any).fayeClient.publish(`/heartbeat/${user?.id || 0}`, {
        type: 'heartbeat',
        // data: user || {},
        id: user?.id || 0,
        timestamp: new Date().getTime(),
      });
    };

    beatHeart();
    // Handle heartbeat
    (window as any).heartbeatLoop = setInterval(() => {
      beatHeart();
    }, 1000 * 10);

    return () => clearInterval((window as any).heartbeatLoop);
  }, []);

  useEffect(() => {
    clearListeners('/channel/*');
    if (channels.length > 0) {
      listenTo('/channel/*', handleRealtime);
    }
    setTimeout(() => {
      scrollToBottomOfMessages();
    }, 500);

    return () => {
      clearListeners('/channel/*');
    };
  }, [channels, id]);

  useEffect(() => {
    clearListeners('/heartbeat/*');

    listenTo('/heartbeat/*', function (data: any) {
      dispatch(
        setConnectedAction({
          id: data.id,
          timestamp: data.timestamp,
        })
      );
    });
    return () => {
      clearListeners('/heartbeat/*');
    };
  }, [channels, id]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersAsync({ graphql: gqlClient }));
    }
  }, []);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        height: '100vh%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user?.username || 'Unknown'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user?.role?.name || 'No role'}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <GroupMenuSection
        navConfig={getConfigForChannel({ types: ['private', 'public'] }, channels, user as IUser, connectedUsers)}
        title="Channels"
        loading={channelLoading}
        onAdd={() => openModal(<CreateChannelForm />)}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GroupMenuSection
        navConfig={getConfigForChannel({ types: ['direct'] }, channels, user as IUser, connectedUsers)}
        title="Direct messages"
        loading={channelLoading}
      />
    </Box>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
