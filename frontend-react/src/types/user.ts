/* eslint-disable @typescript-eslint/ban-types */
import { ApolloClient } from '@apollo/client';

export interface IWithGql {
  graphql: ApolloClient<object>;
}

export interface ILoginParameters extends IWithGql {
  username: string;
  password: string;
}

export interface IUserRole {
  id: string;
  name: string;
  description?: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role?: IUserRole;
  jwt?: string;
}

export interface IRegisterParamerets extends IWithGql {
  username: string;
  password: string;
  email: string;
}

export interface IFetchUsersParameters extends IWithGql {}
