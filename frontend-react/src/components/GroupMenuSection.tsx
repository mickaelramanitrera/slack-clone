/* eslint-disable quotes */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import LinearProgress from '@mui/material/LinearProgress';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@iconify/icons-eva/plus-circle-outline';
import Stack from '@mui/material/Stack';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { IChannel } from '../types/channel';
import { IUser } from '../types/user';

// ----------------------------------------------------------------------

const ListItemStyle: any = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }: { [name: string]: any }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev: any) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: any) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

export interface GroupMenuProps {
  navConfig: any[];
  title: string;
  loading: boolean;
  onAdd?: () => void;
  [name: string]: any;
}

export default function GroupMenuSection({ navConfig, title, loading, onAdd, ...other }: GroupMenuProps) {
  const { pathname } = useLocation();
  const match = (path: any) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{title}</Typography>
          {onAdd && (
            <IconButton aria-label="Add" onClick={onAdd}>
              <Icon icon={AddIcon} width={22} height={22} />
            </IconButton>
          )}
        </Stack>
      </Box>
      {loading && (
        <Box sx={{ width: '100%', p: 2 }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && (
        <List disablePadding>
          {navConfig.map((item: any) => (
            <NavItem key={item.title} item={item} active={match} />
          ))}
        </List>
      )}
    </Box>
  );
}

export interface ConfigForChannelParam {
  types: string[];
}

const getIcon = (name: any) => <Icon icon={name} width={22} height={22} />;

export const getConfigForChannel = (config: ConfigForChannelParam, channels: IChannel[], connectedUser: IUser) => {
  const relatedChannels = channels.filter((channel: IChannel) => config.types.includes(channel?.type || 'nochannel'));

  return relatedChannels.map((channel) => ({
    title: getChannelTitle(channel, connectedUser),
    path: `/dashboard/channel/${channel.id}`,
    icon: getIcon(channel.type === 'direct' ? personAddFill : lockFill),
  }));
};

export const getChannelTitle = (channel: IChannel, connectedUser: IUser): string => {
  if (channel.type === 'direct') {
    if (channel.members.length === 1 && channel.members[0].id === connectedUser.id) {
      return `${connectedUser.username} (to myself)`;
    }

    if (channel.members.length === 2) {
      const otherUser: IUser = channel.members.filter((u) => u.id !== connectedUser.id)[0];
      return otherUser.username;
    }

    return channel.name;
  }

  return channel.name;
};
