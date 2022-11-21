import React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';

const Root: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
        md: 'minmax(160px, 300px) minmax(300px, 1fr)'
      },
      gridTemplateRows: '64px 1fr',
      height: '100vh'
    }}
  />
);
// this is a code snippet

const Header: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    component="header"
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      gridColumn: '1 / -1',
      backgroundColor: 'background.surface',
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}
  />
);

const SideNav: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    component="nav"
    sx={{
      backgroundColor: 'background.surface',
      borderRight: '1px solid',
      borderColor: 'divider',
      display: {
        xs: 'none',
        sm: 'initial'
      }
    }}
  />
);

const Main: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    component="main"
    sx={{
      backgroundColor: 'background.surface',
      overflow: 'auto',
      ...(props.sx ?? {})
    }}
  />
);

const UpDown: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    component="section"
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 150px',
      height: '100%'
    }}
  />
);

const Up: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      overflow: 'auto'
    }}
  />
);

const Down: React.FC<BoxProps> = (props) => (
  <Box {...props} />
);

const CenteredContainer: React.FC<BoxProps> = (
  props
) => (
  <Box
    {...props}
    sx={{
      mx: 'auto',
      maxWidth: 'sm',
      ...(props.sx ?? {})
    }}
  />
);

export default {
  Root,
  Header,
  SideNav,
  Main,
  UpDown,
  Up,
  Down,
  CenteredContainer
};
