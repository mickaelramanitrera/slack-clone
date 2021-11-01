import { gql } from '@apollo/client';
import type { ILoginParameters, IRegisterParamerets } from '../types/user';

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
