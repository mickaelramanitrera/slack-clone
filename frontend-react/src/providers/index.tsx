/* eslint-disable no-undef */
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, DefaultOptions } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { reactLocalStorage } from 'reactjs-localstorage';
// theme
import ThemeConfig from '../theme';
import GlobalStyles from '../theme/globalStyles';
// components
import ScrollToTop from '../components/ScrollToTop';
import store from '../redux/store';
// Providers
import { SnackbarProvider } from './Snackbar';
import UserConnectedProvider from './UserConnected';
import ModalProvider from './Modal';
import type { IUser } from '../types/user';

const graphqlLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_GRAPHQL || '',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { jwt } = reactLocalStorage.getObject('user') as IUser;
  const jwtIsValid = jwt !== undefined && typeof jwt === 'string';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: jwtIsValid ? `Bearer ${jwt}` : '',
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: authLink.concat(graphqlLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

const Providers: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <SnackbarProvider>
        <UserConnectedProvider>
          <ModalProvider>
            <ThemeConfig>
              <ScrollToTop />
              <GlobalStyles />
              {children}
            </ThemeConfig>
          </ModalProvider>
        </UserConnectedProvider>
      </SnackbarProvider>
    </ReduxProvider>
  </ApolloProvider>
);

export default Providers;
