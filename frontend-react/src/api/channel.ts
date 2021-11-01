import { gql } from '@apollo/client';
import { IFetchChannelParameters, ICreateChannelParameters } from '../types/channel';

export const fetchChannels = async ({ graphql, userId }: IFetchChannelParameters): Promise<any> => {
  const results = await graphql.query({
    query: gql`
      query FetchChannels($whereFilter: JSON) {
        channels(where: $whereFilter) {
          id
          name
          description
          type
          owner {
            id
            username
            username
          }
          members {
            id
            username
            email
          }
        }
      }
    `,
    variables: {
      whereFilters: { members: { id: userId } },
    },
  });

  return results.data;
};

export const createChannel = async ({ graphql, ...params }: ICreateChannelParameters): Promise<any> => {
  const results = await graphql.mutate({
    mutation: gql`
      mutation CreateChannel($CreateChannelInput: createChannelInput!) {
        createChannel(input: $CreateChannelInput) {
          channel {
            id
            name
            description
            owner {
              id
              username
              email
            }
            members {
              id
              username
              email
            }
            type
          }
        }
      }
    `,
    variables: {
      CreateChannelInput: {
        data: {
          ...params,
        },
      },
    },
  });

  return results.data;
};
