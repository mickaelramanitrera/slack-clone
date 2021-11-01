/* eslint-disable no-undef */
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// theme
import ThemeConfig from '../theme';
import GlobalStyles from '../theme/globalStyles';
// components
import { SnackbarProvider } from './Snackbar';
import ScrollToTop from '../components/ScrollToTop';
import store from '../redux/store';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_GRAPHQL || '',
  cache: new InMemoryCache(),
});

const Providers: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <SnackbarProvider>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          {children}
        </ThemeConfig>
      </SnackbarProvider>
    </ReduxProvider>
  </ApolloProvider>
);

export default Providers;
