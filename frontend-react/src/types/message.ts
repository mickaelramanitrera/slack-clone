/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
import { ApolloClient } from '@apollo/client';
import { IChannel } from './channel';
import { IUser } from './user';

export interface IMessage {
  id: string;
  created_at: Date;
  updated_at: Date;
  content: string;
  channel: IChannel;
  from: IUser;
}

export interface ICreateMessageParams {
  graphql: ApolloClient<object>;
  content: string;
  from: string;
  channel: string;
}

export interface IFetchMessageParams {
  graphql: ApolloClient<object>;
  channelId: string;
}
