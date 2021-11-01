import { gql } from '@apollo/client';
import type { ILoginParameters, IRegisterParamerets, IFetchUsersParameters } from '../types/user';

export const login = async ({ username, password, graphql }: ILoginParameters): Promise<any> => {
  const results = await graphql.mutate({
    mutation: gql`
      mutation Login($loginInput: UsersPermissionsLoginInput!) {
        login(input: $loginInput) {
          jwt
          user {
            id
            username
            email
            role {
              id
              name
            }
          }
        }
      }
    `,
    variables: {
      loginInput: {
        identifier: username,
        password,
      },
    },
  });

  return results.data;
};

export const register = async ({ username, password, email, graphql }: IRegisterParamerets): Promise<any> => {
  const results = await graphql.mutate({
    mutation: gql`
      mutation Register($userInfos: UsersPermissionsRegisterInput!) {
        register(input: $userInfos) {
          user {
            id
            username
            email
          }
        }
      }
    `,
    variables: {
      userInfos: {
        username,
        password,
        email,
      },
    },
  });

  return results.data;
};

export const fetchUsers = async ({ graphql }: IFetchUsersParameters): Promise<any> => {
  const results = await graphql.query({
    query: gql`
      query FetchUsers {
        users {
          id
          username
          email
        }
      }
    `,
  });

  return results.data;
};
