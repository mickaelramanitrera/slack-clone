import React from 'react';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        px: 2
      }}
    >
      <IconButton
        variant="plain"
        onClick={() => navigate('/')}
      >
        <MenuIcon />
      </IconButton>

      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        badgeInset="14%"
        color="success"
        sx={{
          '& .JoyBadge-badge': {
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              animation:
                'ripple 1.2s infinite ease-in-out',
              border: '2px solid',
              borderColor: 'success.500',
              content: '""'
            }
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1
            },
            '100%': {
              transform: 'scale(2)',
              opacity: 0
            }
          }
        }}
      >
        <Avatar>M</Avatar>
      </Badge>
    </Box>
  );
};

export default Header;
