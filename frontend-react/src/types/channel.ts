/* eslint-disable @typescript-eslint/ban-types */
import { ApolloClient } from '@apollo/client';
import { IUser } from './user';

export interface IChannel {
  name: string;
  description?: string;
  id: string;
  owner: IUser;
  members: IUser[];
  type?: string;
}

export interface IFetchChannelParameters {
  graphql: ApolloClient<object>;
  userId: string | number;
}

export interface ICreateChannelParameters {
  graphql: ApolloClient<object>;
  name: string;
  description?: string;
  owner: string;
  members: string[];
  type?: string;
}
