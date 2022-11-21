import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import { getRandomListItemColor } from './utils';
import type { Channel } from './types';

interface ChannelsProps {
  title?: string;
  channels: Channel[];
}

interface ChannelListItemProps {
  label: string;
  icon?: React.ReactElement;
}

const ChannelListItem: React.FC<
  ChannelListItemProps
> = ({ label, icon }) => (
  <ListItem>
    <ListItemButton
      color={getRandomListItemColor()}
    >
      <ListItemDecorator>
        {icon ?? null}
      </ListItemDecorator>
      <ListItemContent>
        <Typography level="body2" noWrap>
          {label}
        </Typography>
      </ListItemContent>
    </ListItemButton>
  </ListItem>
);

const Channels: React.FC<ChannelsProps> = ({
  title,
  channels
}) => {
  const channelItems = React.useMemo(() => {
    return channels.map((channel) => (
      <ChannelListItem
        label={channel.name}
        key={channel.name}
        icon={channel?.icon}
      />
    ));
  }, [channels]);
  return (
    <Box sx={{ py: 1, px: 2 }}>
      <Typography
        level="h6"
        textColor="neutral.500"
        sx={{
          py: 1,
          px: 2
        }}
      >
        {title || 'Channels'}
      </Typography>

      <List
        sx={{
          py: 1,
          '& [role="button"]': {
            borderRadius: '10px'
          }
        }}
      >
        {channelItems}
      </List>
    </Box>
  );
};

export default Channels;
