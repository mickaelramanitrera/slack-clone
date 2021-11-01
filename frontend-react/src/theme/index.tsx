import PropTypes from 'prop-types';
import { useMemo, ReactElement } from 'react';
// material
import { CssBaseline, Theme } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  ThemeOptions,
} from '@mui/material/styles';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }: { children: ReactElement[] }) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
