/* eslint-disable camelcase */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Avatar, Typography } from '@mui/material';
import { IUser } from '../../../../types/user';
import account from '../../../../_mocks_/account';

const MessageStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: (theme as any).shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
  maxWidth: '350px',
}));

export interface MessageProps {
  from: IUser;
  created_at?: Date;
  updated_at?: Date;
  content: string;
  position: 'left' | 'right';
}

export default ({ from, content, position }: MessageProps) => (
  <Stack direction={position === 'left' ? 'row' : 'row-reverse'}>
    <Avatar src={account.photoURL} alt="photoURL" sx={{ mr: 1 }} />
    <Stack direction="column">
      <Typography variant="subtitle1" sx={{ mx: 1 }} textAlign={position}>
        {from.username}
      </Typography>
      <MessageStyle>{content}</MessageStyle>
    </Stack>
  </Stack>
);
