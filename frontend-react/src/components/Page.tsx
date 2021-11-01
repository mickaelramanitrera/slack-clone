import { Helmet } from 'react-helmet-async';
import { forwardRef, FC } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page: FC<{ [name: string]: any }> = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

export default Page;
