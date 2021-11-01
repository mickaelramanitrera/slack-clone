/* eslint-disable @typescript-eslint/ban-types */
import { ApolloClient, InMemoryCache } from '@apollo/client';

export interface ILoginParameters {
  username: string;
  password: string;
  graphql: ApolloClient<object>;
}

export interface IUserRole {
  id: string;
  name: string;
  description: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: IUserRole;
}
